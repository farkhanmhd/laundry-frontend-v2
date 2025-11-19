import { Inventory } from "@/lib/features/inventories/data";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useMemo } from "react";

export interface PosProduct {
  quantity: number;
  product: Inventory;
}

export interface PosProductState {
  open: boolean;
  items: PosProduct[];
}

const posProductsAtom = atomWithStorage<PosProductState>(
  "pos-selected-products",
  {
    open: false,
    items: [],
  }
);

export const usePosProducts = () => {
  const [posProduct, setPosProduct] = useAtom(posProductsAtom);

  const toggleCart = () => {
    setPosProduct((prev) => ({ ...prev, open: !prev.open }));
  };

  const totalItems = useMemo(
      () => posProduct.items.reduce((total, item) => total + item.quantity, 0),
      [posProduct.items]
    );

  return { posProduct, setPosProduct, toggleCart, totalItems };
};
