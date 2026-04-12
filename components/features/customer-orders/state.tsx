"use client";

import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useParams, useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import {
  type ChangeEvent,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { toast } from "sonner";
import { elysia } from "@/elysia";
import type { AccountAddress } from "@/lib/modules/account/data";
import { createPickupRequest } from "@/lib/modules/customer-orders/actions";
import type { RequestPickupSchema } from "@/lib/modules/customer-orders/schema";
import type { PosItemData, PosVoucher } from "@/lib/modules/pos/data";
import { getMaxDiscount, type PosOrderItem } from "@/lib/modules/pos/state";
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
}

const initialState: CustomerOrderState = {
  items: [],
  voucherList: [],
  selectedVoucher: null,
  points: null,
  selectedAddress: null,
};

const customerOrderAtom = atomWithStorage<CustomerOrderState>(
  "customer-cart",
  initialState
);

export const useCustomerOrder = () => {
  const [customerCart, setCustomerCart] = useAtom(customerOrderAtom);
  const { push } = useRouter();

  const { execute, isPending } = useAction(createPickupRequest, {
    onSuccess: ({ data: result }) => {
      if (result && result.status === "success") {
        toast.success(result.message);
        push(`/customer-orders/${result.data?.orderId}`);
        clearCustomerCart();
      }
    },
  });

  const submitPickupRequest = () => {
    if (selectedAddress) {
      const data: RequestPickupSchema = {
        items: customerCart.items,
        addressId: selectedAddress,
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

      execute(data);
    }
  };

  const handleAddToCart = (item: PosItemData) => {
    const existingItem = customerCart.items.find((i) => i.id === item.id);

    if (existingItem) {
      setCustomerCart((prev) => ({
        ...prev,
        items: prev.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
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

    toast("1 Item added to cart", {
      action: {
        label: "View Cart",
        onClick: () => push("/customer-orders/new/order-summary"),
      },
    });
  };

  const { data: userPoints } = useQuery({
    queryKey: ["points"],
    queryFn: getUserPoints,
  });

  const handleIncrementQuantity = (itemId: string) => {
    setCustomerCart((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      ),
    }));
  };

  const handleDecrementQuantity = (itemId: string) => {
    setCustomerCart((currentProducts) => ({
      ...currentProducts,
      items: currentProducts.items.reduce((newArray, item) => {
        if (item.id === itemId) {
          if (item.quantity > 1) {
            newArray.push({ ...item, quantity: item.quantity - 1 });
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
        .reduce((acc, curr) => acc + curr.quantity * curr.price, 0),
    [customerCart.items]
  );

  const totalItems = useMemo(
    () => customerCart.items.reduce((acc, curr) => acc + curr.quantity, 0),
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
    toast.success(`Voucher ${voucher.description} applied!`);
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
      voucherList: customerCart.voucherList,
    });
  }

  const handleSelectAddress = (addressId: string | null) => {
    setCustomerCart((prev) => ({
      ...prev,
      selectedAddress: addressId,
    }));
  };

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

    if (onlyInventoryItems) {
      return false;
    }

    return true;
  }, [totalItems, selectedAddress, onlyInventoryItems]);

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
    execute,
    isPending,
    submitPickupRequest,
    canRequestPickup,
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
    console.log(JSON.stringify(error));
    throw new Error(`Error: ${error.value.type}`);
  }

  if (data) {
    return data.data.deliveryId;
  }
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

  const handleSubmit = () => {
    if (!selectedAddress) {
      return;
    }
    startTransition(async () => {
      try {
        const deliveryId = await createDeliveryRequest({
          addressId: selectedAddress,
          orderId: params.id as string,
        });
        if (deliveryId) {
          toast.success("Delivery request submitted successfully");
          refresh();
        }
      } catch (error) {
        toast.error(error instanceof Error ? error.message : String(error));
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
