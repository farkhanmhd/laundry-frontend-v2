import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { useMemo } from "react";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";
import { elysia } from "@/elysia";
import { useBreakpoint } from "@/hooks/use-breakpoints";
import type { SearchQuery } from "@/lib/search-params";
import { positiveIntRegex } from "@/lib/utils";
import { createPosOrderAction } from "./actions";
import type { PosItemData } from "./data";
import type { NewOrderSchema, OrderItem } from "./schema";

export const getPosMembers = async (query: SearchQuery) => {
  const { data: response } = await elysia.pos.members.get({
    fetch: {
      credentials: "include",
    },
    query,
  });

  const members = response?.data.members;
  return members;
};

export type PosCustomer = NonNullable<
  Awaited<ReturnType<typeof getPosMembers>>
>[number];

export interface PosOrderItem extends OrderItem {
  id: string;
  image: string;
  name: string;
  price: number;
  stock?: number | null;
}

export type CustomerType = ("guest" | "member") & string;
export type PaymentMethod = ("cash" | "qris") & string;

export interface PosDataState {
  open: boolean;
  items: PosOrderItem[];
  customerName: string;
  amountPaid: number;
  paymentMethod: PaymentMethod;
  customerType: CustomerType;
  phone: string;
  member?: PosCustomer | null;
}

const initialData: PosDataState = {
  open: false,
  items: [],
  customerName: "",
  amountPaid: 0,
  paymentMethod: "cash",
  customerType: "guest",
  phone: "",
};

const posDataAtom = atomWithStorage<PosDataState>("pos-data", initialData);

export const usePOS = () => {
  const [posData, setPosData] = useAtom(posDataAtom);
  const isLarge = useBreakpoint(1024);
  const { push } = useRouter();
  const { execute, isPending } = useAction(createPosOrderAction, {
    onSuccess: ({ data: result }) => {
      if (result && result.status === "success") {
        toast.success(result.message);
        push(`/orders/${result.data?.orderId}/payment`);
        clearPosData();
      } else {
        toast.error("Failed to create new Order");
      }
    },
  });
  const [debouncedSearch] = useDebounce(posData.phone, 300);

  const {
    data: members,
    isLoading: isLoadingMembers,
    isFetching: isFetchingMembers,
  } = useQuery({
    queryKey: ["members", debouncedSearch],
    queryFn: () => getPosMembers({ search: debouncedSearch }),
    enabled: debouncedSearch.length > 0,
    staleTime: 10,
    structuralSharing: true,
    placeholderData: keepPreviousData,
  });

  const submitPosOrder = () => {
    const baseData = {
      customerName: posData.customerName,
      items: posData.items.map((item) => ({
        itemType: item.itemType,
        quantity: item.quantity,
        serviceId: item.serviceId || null,
        inventoryId: item.inventoryId || null,
        bundlingId: item.bundlingId || null,
        voucherId: item.voucherId || null,
        note: item.note,
      })),
    };

    let payload: NewOrderSchema;

    if (posData.paymentMethod === "cash") {
      payload = {
        ...baseData,
        paymentType: "cash",
        amountPaid: posData.amountPaid,
      };
    } else {
      payload = {
        ...baseData,
        paymentType: "qris",
      };
    }

    execute(payload);
  };

  const handlePhoneChange = (value: string) => {
    setPosData((prev) => ({
      ...prev,
      phone: value.replace(positiveIntRegex, ""),
    }));
  };

  const toggleCart = () => {
    setPosData((prev) => ({ ...prev, open: !prev.open }));
  };

  const handleIncrementQuantity = (itemId: string) => {
    setPosData({
      ...posData,
      items: posData.items.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      ),
    });
  };

  const handleDecrementQuantity = (itemId: string) => {
    setPosData((currentProducts) => ({
      ...posData,
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

  const handleAddToCart = (item: PosItemData) => {
    const existingItem = posData.items.find((i) => i.id === item.id);

    if (existingItem) {
      setPosData((prev) => ({
        ...prev,
        items: posData.items.map((i) =>
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

      setPosData((prev) => ({
        ...prev,
        items: [...prev.items, newItem],
      }));
    }

    if (!isLarge) {
      toast("1 Item added to cart", {
        action: {
          label: "View Cart",
          onClick: () => setPosData((prev) => ({ ...prev, open: true })),
        },
      });
    }
  };

  const totalAmount = useMemo(
    () =>
      posData.items.reduce((acc, curr) => acc + curr.quantity * curr.price, 0),
    [posData.items]
  );

  const totalItems = useMemo(
    () => posData.items.reduce((total, item) => total + item.quantity, 0),
    [posData.items]
  );

  const handleCustomerTypeChange = (value: CustomerType) => {
    setPosData((prev) => ({
      ...prev,
      customerType: value,
    }));
  };

  const handlePaymentMethodChange = (value: PaymentMethod) => {
    setPosData((prev) => ({
      ...prev,
      paymentMethod: value,
    }));
  };

  const handleCustomerNameChange = (value: string) => {
    setPosData((prev) => ({
      ...prev,
      customerName: value,
    }));
  };

  const handleAmountPaidChange = (value: string | number) => {
    if (typeof value === "string") {
      setPosData((prev) => ({
        ...prev,
        amountPaid: Number(value.replace(positiveIntRegex, "")),
      }));
    }

    if (typeof value === "number") {
      setPosData((prev) => ({
        ...prev,
        amountPaid: value,
      }));
    }
  };

  const handleSelectMember = (member: PosCustomer) => {
    setPosData((prev) => ({
      ...prev,
      member,
      customerName: member.name,
      phone: member.phone,
    }));
  };

  const clearSelectedCustomer = () => {
    setPosData((prev) => ({
      ...prev,
      phone: "",
      member: null,
      customerName: "",
    }));
  };

  function clearPosData() {
    setPosData(initialData);
  }

  const customerNameValidation = posData.customerName.length <= 2;
  const amountPaidValidation = posData.amountPaid < totalAmount;
  const { items: orderItems, customerType, phone } = posData;

  return {
    amountPaidValidation,
    customerNameValidation,
    posData,
    setPosData,
    toggleCart,
    totalItems,
    handleIncrementQuantity,
    handleDecrementQuantity,
    totalAmount,
    handleAddToCart,
    handleCustomerTypeChange,
    handlePaymentMethodChange,
    handleCustomerNameChange,
    handleAmountPaidChange,
    clearPosData,
    submitPosOrder,
    isPending,
    orderItems,
    customerType,
    isLoadingMembers,
    members,
    isFetchingMembers,
    handlePhoneChange,
    phone,
    handleSelectMember,
    clearSelectedCustomer,
    debouncedSearch,
  };
};
