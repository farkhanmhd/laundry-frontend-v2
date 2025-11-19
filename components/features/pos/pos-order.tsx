"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { PosOrderProducts } from "./pos-order-products";

export const PosOrder = () => {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <div className="w-2xl border-l">
        <PosOrderProducts />
      </div>
    );
  }

  return null;
};
