"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  type ChangeEvent,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { toast } from "sonner";
import { elysia } from "@/elysia";
import type { AccountAddress } from "@/lib/modules/account/data";
import { CustomerOrdersApi } from "@/lib/modules/customer-orders/data";
import type { RequestPickupSchema } from "@/lib/modules/customer-orders/schema";
import type { PosItemData, PosVoucher } from "@/lib/modules/pos/data";
import { getMaxDiscount, type PosOrderItem } from "@/lib/modules/pos/state";
import { toastResponse } from "@/lib/toast-helper";
import { positiveIntRegex } from "@/lib/utils";

const getUserPoints = async () => {
  const { data: response } = await elysia.members.points.get({
    fetch: {
      credentials: "include",
    },
  });

  const points = response?.data.points ?? 0;

  return points;
};

export interface CustomerOrderState {
  items: PosOrderItem[];
  voucherList: PosVoucher[];
  selectedVoucher: PosVoucher | null;
  points?: number | null;
  selectedAddress: string | null;
  requestTime: string | null;
  weightRangeId: number | null;
  weight: number | null | undefined;
}

const initialState: CustomerOrderState = {
  items: [],
  voucherList: [],
  selectedVoucher: null,
  points: null,
  selectedAddress: null,
  requestTime: null,
  weightRangeId: null,
  weight: null,
};

const customerOrderAtom = atomWithStorage<CustomerOrderState>(
  "customer-cart",
  initialState
);

export const useCustomerOrder = () => {
  const [customerCart, setCustomerCart] = useAtom(customerOrderAtom);
  const t = useTranslations("CustomerOrders.orderSummary");
  const tNotifications = useTranslations("Notifications");
  const { push } = useRouter();

  const createPickupRequestMutation = useMutation({
    mutationFn: (data: RequestPickupSchema) =>
      CustomerOrdersApi.createPickupRequest(data),
    onSuccess: (response) => {
      if (!response) {
        toast.error(toastResponse(tNotifications, {}));
        return;
      }

      if (response.status !== 201) {
        toast.error(
          toastResponse(
            tNotifications,
            (response.error?.value as {
              messageKey?: string;
              message?: string;
            }) || {}
          )
        );
        return;
      }

      if (response.data) {
        toast.success(toastResponse(tNotifications, response.data));
        push(`/customer-orders/${response.data.data.orderId}`);
        clearCustomerCart();
      }
    },
    onError: () => {
      toast.error(toastResponse(tNotifications, {}));
    },
  });

  const submitPickupRequest = () => {
    if (
      !(
        selectedAddress &&
        customerCart.requestTime &&
        customerCart.weightRangeId
      )
    ) {
      return;
    }

    const data: RequestPickupSchema = {
      items: customerCart.items.map((item) => ({
        ...item,
        quantity: item.quantity ?? 1,
      })),
      addressId: selectedAddress,
      requestTime: customerCart.requestTime,
      weightRangeId: customerCart.weightRangeId,
      weight: customerCart.weight ?? null,
    };

    if (customerCart.points) {
      data.points = customerCart.points;
    }

    if (customerCart.selectedVoucher) {
      data.items.push({
        itemType: "voucher",
        voucherId: customerCart.selectedVoucher.id,
        quantity: 1,
      });
    }

    createPickupRequestMutation.mutate(data);
  };

  const handleAddToCart = (item: PosItemData) => {
    const existingItem = customerCart.items.find((i) => i.id === item.id);

    if (existingItem) {
      setCustomerCart((prev) => ({
        ...prev,
        items: prev.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity ?? 0 } : i
        ),
      }));
    } else {
      const dynamicIdKey = `${item.itemType}Id`;
      const { stock, ...otherItemProps } = item;

      const newItem = {
        ...otherItemProps,
        image: item.image ?? "/placeholder.svg",
        note: "",
        quantity: 1,
        itemType: item.itemType as
          | "service"
          | "inventory"
          | "bundling"
          | "voucher",
        [dynamicIdKey]: item.id,
        ...(item.itemType === "inventory" && { stock }),
      };

      setCustomerCart((prev) => ({ ...prev, items: [...prev.items, newItem] }));
    }

    toast(t("itemAdded"), {
      action: {
        label: t("viewCart"),
        onClick: () => push("/customer-orders/new/order-summary"),
      },
    });
  };

  const { data: userPoints } = useQuery({
    queryKey: ["points"],
    queryFn: getUserPoints,
  });

  const { data: weightRanges } = useQuery({
    queryKey: ["weight-ranges"],
    queryFn: async () => {
      const { data: response } = await elysia["weight-ranges"].get({
        fetch: {
          credentials: "include",
        },
      });
      return response?.data;
    },
  });

  const selectedWeightRange = useMemo(
    () =>
      weightRanges?.find((r) => r.id === customerCart.weightRangeId) ?? null,
    [weightRanges, customerCart.weightRangeId]
  );

  const setWeightRange = useCallback(
    (id: number | null) => {
      setCustomerCart((prev) => {
        if (id === null) {
          return { ...prev, weightRangeId: id };
        }

        const range = weightRanges?.find((r) => r.id === id);
        if (!range) {
          return { ...prev, weightRangeId: id };
        }

        const rangeMax = Number(range.maxWeight);

        return {
          ...prev,
          weightRangeId: id,
          items: prev.items.map((item) => {
            const itemMaxWeight = (item as unknown as Record<string, unknown>)
              .maxWeight as string | null | undefined;
            if (itemMaxWeight != null) {
              const maxWeight = Number(itemMaxWeight);
              if (maxWeight > 0) {
                return { ...item, quantity: Math.ceil(rangeMax / maxWeight) };
              }
            }
            return item;
          }),
        };
      });
    },
    [setCustomerCart, weightRanges]
  );

  const setWeight = useCallback(
    (w: number | null | undefined) => {
      setCustomerCart((prev) => ({ ...prev, weight: w }));
    },
    [setCustomerCart]
  );

  const handleIncrementQuantity = (itemId: string) => {
    setCustomerCart((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === itemId
          ? { ...item, quantity: (item.quantity ?? 0) + 1 }
          : item
      ),
    }));
  };

  const handleDecrementQuantity = (itemId: string) => {
    setCustomerCart((currentProducts) => ({
      ...currentProducts,
      items: currentProducts.items.reduce((newArray, item) => {
        if (item.id === itemId) {
          if ((item.quantity ?? 1) > 1) {
            newArray.push({ ...item, quantity: (item.quantity ?? 1) - 1 });
          }
        } else {
          newArray.push(item);
        }
        return newArray;
      }, [] as PosOrderItem[]),
    }));
  };

  const totalAmount = useMemo(
    () =>
      customerCart.items
        .filter((item) => item.itemType !== "voucher")
        .reduce((acc, curr) => acc + (curr.quantity ?? 0) * curr.price, 0),
    [customerCart.items]
  );

  const totalItems = useMemo(
    () =>
      customerCart.items.reduce((acc, curr) => acc + (curr.quantity ?? 0), 0),
    [customerCart.items]
  );

  const pointsEarned = useMemo(
    () => (totalAmount >= 10_000 ? Math.floor(totalAmount / 10) : 0),
    [totalAmount]
  );

  const totalDiscount = useMemo(() => {
    if (!customerCart.selectedVoucher) {
      return 0;
    }

    return getMaxDiscount(customerCart.selectedVoucher, totalAmount);
  }, [customerCart.selectedVoucher, totalAmount]);

  const amountBeforePoints = useMemo(
    () => Math.max(0, totalAmount - totalDiscount),
    [totalAmount, totalDiscount]
  );

  const totalAmountToBePaid = useMemo(() => {
    const finalValue = totalAmount - totalDiscount - (customerCart.points ?? 0);

    return finalValue > 0 ? finalValue : 0;
  }, [totalAmount, totalDiscount, customerCart.points]);

  useEffect(() => {
    if (customerCart.selectedVoucher) {
      const minSpend = customerCart.selectedVoucher.minSpend || 0;
      const isCartEmpty = totalAmount === 0;
      const isBelowMinSpend = totalAmount < minSpend;

      if (isCartEmpty || isBelowMinSpend) {
        setCustomerCart((prev) => ({ ...prev, selectedVoucher: null }));
      }
    }
  }, [totalAmount, customerCart.selectedVoucher, setCustomerCart]);

  const togglePoint = () => {
    setCustomerCart((prev) => ({
      ...prev,
      points: prev.points !== null ? null : 0,
    }));
  };

  const handleSelectVoucher = (voucher: PosVoucher) => {
    setCustomerCart((prev) => ({
      ...prev,
      selectedVoucher: voucher,
    }));
    toast.success(
      tNotifications("pos.voucher.applied", {
        description: voucher.description,
      })
    );
  };

  const handleRemoveVoucher = () => {
    setCustomerCart((prev) => ({
      ...prev,
      selectedVoucher: null,
    }));
  };

  const isSelectedVoucher = (voucherId: string) =>
    voucherId === customerCart.selectedVoucher?.id;

  const handlePointChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 1. Get the raw number the user is trying to type
    const rawValue = Number(e.target.value.replace(positiveIntRegex, ""));

    // 2. Determine the strict upper limit
    const maxAllowed = Math.min(
      userPoints ?? 0, // Limit 1: Their wallet balance
      amountBeforePoints // Limit 2: The current bill
    );

    // 3. Cap the input
    const value = Math.min(rawValue, maxAllowed);

    setCustomerCart((prev) => ({
      ...prev,
      points: value,
    }));
  };

  useEffect(() => {
    // If we have points applied...
    if (customerCart.points && customerCart.points > 0) {
      const maxAllowed = Math.min(userPoints ?? 0, amountBeforePoints);

      // ...and the current points exceed the new limit (e.g. after removing an item)
      if (customerCart.points > maxAllowed) {
        setCustomerCart((prev) => ({
          ...prev,
          points: maxAllowed, // Auto-reduce to the new max
        }));
      }
    }
  }, [amountBeforePoints, customerCart.points, userPoints, setCustomerCart]);

  function clearCustomerCart() {
    setCustomerCart({
      items: [],
      selectedAddress: null,
      selectedVoucher: null,
      points: null,
      requestTime: null,
      weightRangeId: null,
      weight: null,
      voucherList: customerCart.voucherList,
    });
  }

  const handleSelectAddress = (addressId: string | null) => {
    setCustomerCart((prev) => ({
      ...prev,
      selectedAddress: addressId,
    }));
  };

  const handleRequestTimeChange = useCallback(
    (requestTime: string) => {
      setCustomerCart((prev) => ({
        ...prev,
        requestTime,
      }));
    },
    [setCustomerCart]
  );

  const { voucherList, selectedAddress } = customerCart;

  const onlyInventoryItems = useMemo(() => {
    const inventoryItems = customerCart.items.every(
      (item) => item.itemType === "inventory"
    );
    return inventoryItems;
  }, [customerCart.items]);

  const canRequestPickup = useMemo(() => {
    if (totalItems <= 0) {
      return false;
    }

    if (!selectedAddress) {
      return false;
    }

    if (!customerCart.requestTime) {
      return false;
    }

    if (customerCart.weightRangeId === null) {
      return false;
    }

    if (onlyInventoryItems) {
      return false;
    }

    return true;
  }, [
    totalItems,
    selectedAddress,
    customerCart.requestTime,
    customerCart.weightRangeId,
    onlyInventoryItems,
  ]);

  const pickupDisabledReason = useMemo(() => {
    if (totalItems <= 0) {
      return "cartEmpty";
    }

    if (!selectedAddress) {
      return "noAddress";
    }

    if (!customerCart.requestTime) {
      return "noRequestTime";
    }

    if (customerCart.weightRangeId === null) {
      return "noWeightRange";
    }

    if (onlyInventoryItems) {
      return "onlyInventoryItems";
    }

    return null;
  }, [
    totalItems,
    selectedAddress,
    customerCart.requestTime,
    customerCart.weightRangeId,
    onlyInventoryItems,
  ]);

  return {
    customerCart,
    setCustomerCart,
    handleAddToCart,
    totalItems,
    handleIncrementQuantity,
    handleDecrementQuantity,
    totalAmount,
    pointsEarned,
    totalDiscount,
    amountBeforePoints,
    voucherList,
    totalAmountToBePaid,
    isSelectedVoucher,
    handleSelectVoucher,
    handleRemoveVoucher,
    handlePointChange,
    togglePoint,
    userPoints,
    clearCustomerCart,
    selectedAddress,
    handleSelectAddress,
    handleRequestTimeChange,
    execute: createPickupRequestMutation.mutate,
    isPending: createPickupRequestMutation.isPending,
    submitPickupRequest,
    canRequestPickup,
    pickupDisabledReason,
    weightRanges,
    selectedWeightRange,
    setWeightRange,
    setWeight,
  };
};

interface CustomerOrderAddress {
  addresses: AccountAddress[] | undefined;
  selectedAddress: string | null;
  setSelectedAddress: (value: string | null) => void;
  selectingAddress: boolean;
  setSelectingAddress: (value: boolean) => void;
  isPending: boolean;
  handleSubmit: () => void;
}

const CustomerOrderAddressContext = createContext<CustomerOrderAddress | null>(
  null
);

async function getUserAddresses() {
  const { data: response } = await elysia.account.addresses.get({
    fetch: {
      credentials: "include",
    },
  });

  if (!response?.data) {
    return [];
  }
  return response.data;
}

async function createDeliveryRequest(body: {
  addressId: string;
  orderId: string;
  requestTime: string;
}) {
  const { data, error } = await elysia.customerorders["request-delivery"].post(
    body,
    {
      fetch: {
        credentials: "include",
      },
    }
  );

  if (error) {
    throw error.value || new Error("Error creating delivery request");
  }

  return data;
}

export const CustomerOrderAddressProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: addresses } = useQuery({
    queryKey: ["addresses"],
    queryFn: getUserAddresses,
  });
  const params = useParams();
  const [isPending, startTransition] = useTransition();
  const [selectingAddress, setSelectingAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const { refresh } = useRouter();
  const tNotifications = useTranslations("Notifications");

  const handleSubmit = () => {
    if (!selectedAddress) {
      return;
    }
    startTransition(async () => {
      try {
        const data = await createDeliveryRequest({
          addressId: selectedAddress,
          orderId: params.id as string,
          requestTime: new Date().toISOString(),
        });
        if (data) {
          toast.success(toastResponse(tNotifications, data));
          refresh();
        }
      } catch (error) {
        toast.error(
          toastResponse(
            tNotifications,
            (error as { messageKey?: string; message?: string }) || {}
          )
        );
      }
    });
  };

  const value = {
    addresses,
    selectedAddress,
    setSelectedAddress,
    selectingAddress,
    setSelectingAddress,
    isPending,
    handleSubmit,
  };

  return (
    <CustomerOrderAddressContext.Provider value={value}>
      {children}
    </CustomerOrderAddressContext.Provider>
  );
};

export const useCustomerOrderAddress = (): CustomerOrderAddress => {
  const context = useContext(CustomerOrderAddressContext);
  if (!context) {
    throw new Error(
      "useCustomerOrderAddress must be used within a CustomerOrderAddressProvider"
    );
  }
  return context;
};
