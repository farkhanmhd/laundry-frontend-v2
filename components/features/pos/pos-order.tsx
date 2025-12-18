"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { PosOrderProducts } from "./pos-order-products";

export const PosOrder = () => {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <div
        className="sticky top-0 h-[calc(100dvh-64px)] w-2xl border-l"
        style={{
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >
        <PosOrderProducts />
      </div>
    );
  }

  return null;
};
