import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useMemo } from "react";
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

  const toggleCart = () => {
    setPosItem((prev) => ({ ...prev, open: !prev.open }));
  };

  const totalItems = useMemo(
    () => posItem.items.reduce((total, item) => total + item.quantity, 0),
    [posItem.items]
  );

  return { posItem, setPosItem, toggleCart, totalItems };
};
