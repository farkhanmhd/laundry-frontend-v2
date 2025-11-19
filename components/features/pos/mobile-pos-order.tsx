"use client";

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { usePosProducts } from "@/hooks/state";
import { useBreakpoint } from "@/hooks/use-breakpoints";
import { PosOrderProducts } from "./pos-order-products";

export const MobilePosOrder = () => {
  const { posProduct, toggleCart } = usePosProducts();
  const isLarge = useBreakpoint(1024);

  if (!isLarge) {
    return (
      <Sheet onOpenChange={toggleCart} open={posProduct.open}>
        <SheetContent className="w-svw sm:max-w-md">
          <SheetTitle className="hidden" />
          <PosOrderProducts />
        </SheetContent>
      </Sheet>
    );
  }

  return null;
};
