import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useMemo } from "react";
import { toast } from "sonner";
import { useBreakpoint } from "@/hooks/use-breakpoints";
import type { PosItemData } from "./data";
import type { OrderItem } from "./schema";

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
}

const initialData: PosDataState = {
  open: false,
  items: [],
  customerName: "",
  amountPaid: 0,
  paymentMethod: "cash",
  customerType: "guest",
};

const posDataAtom = atomWithStorage<PosDataState>("pos-data", initialData);

export const usePOS = () => {
  const [posData, setPosData] = useAtom(posDataAtom);
  const isLarge = useBreakpoint(1024);
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

  const handleAmountPaidChange = (value: number) => {
    setPosData((prev) => ({
      ...prev,
      amountPaid: value,
    }));
  };

  const clearPosData = () => {
    setPosData(initialData);
  };

  return {
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
  };
};
