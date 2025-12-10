"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { PosOrderProducts } from "./pos-order-products";

export const PosOrder = () => {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <div className="sticky top-0 h-[calc(100dvh-64px)] w-2xl border-l">
        <PosOrderProducts />
      </div>
    );
  }

  return null;
};
