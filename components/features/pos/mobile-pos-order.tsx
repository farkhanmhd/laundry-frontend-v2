"use client";

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useBreakpoint } from "@/hooks/use-breakpoints";
import { usePosOrderItem } from "@/lib/features/pos/state";
import { PosOrderProducts } from "./pos-order-products";

export const MobilePosOrder = () => {
  const { posItem, toggleCart } = usePosOrderItem();
  const isLarge = useBreakpoint(1024);

  if (!isLarge) {
    return (
      <Sheet onOpenChange={toggleCart} open={posItem.open}>
        <SheetContent className="w-svw sm:max-w-md">
          <SheetTitle className="sr-only" />
          <PosOrderProducts />
        </SheetContent>
      </Sheet>
    );
  }

  return null;
};
