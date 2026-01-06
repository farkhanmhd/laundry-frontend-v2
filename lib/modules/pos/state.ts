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

export interface PosItemState {
  open: boolean;
  items: PosOrderItem[];
}

const posItemsAtom = atomWithStorage<PosItemState>("pos-selected-products", {
  open: false,
  items: [],
});

export const usePosOrderItem = () => {
  const [posItem, setPosItem] = useAtom(posItemsAtom);
  const isLarge = useBreakpoint(1024);
  const toggleCart = () => {
    setPosItem((prev) => ({ ...prev, open: !prev.open }));
  };

  const handleIncrementQuantity = (itemId: string) => {
    setPosItem({
      ...posItem,
      items: posItem.items.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      ),
    });
  };

  const handleDecrementQuantity = (itemId: string) => {
    setPosItem((currentProducts) => ({
      ...posItem,
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
    const existingItem = posItem.items.find((i) => i.id === item.id);

    if (existingItem) {
      setPosItem((prev) => ({
        ...prev,
        items: posItem.items.map((i) =>
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

      setPosItem((prev) => ({
        ...prev,
        items: [...prev.items, newItem],
      }));
    }

    if (!isLarge) {
      toast("1 Item added to cart", {
        action: {
          label: "View Cart",
          onClick: () => setPosItem((prev) => ({ ...prev, open: true })),
        },
      });
    }
  };

  const totalAmount = useMemo(
    () =>
      posItem.items.reduce((acc, curr) => acc + curr.quantity * curr.price, 0),
    [posItem.items]
  );

  const totalItems = useMemo(
    () => posItem.items.reduce((total, item) => total + item.quantity, 0),
    [posItem.items]
  );

  return {
    posItem,
    setPosItem,
    toggleCart,
    totalItems,
    handleIncrementQuantity,
    handleDecrementQuantity,
    totalAmount,
    handleAddToCart,
  };
};
