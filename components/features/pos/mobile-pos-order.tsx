"use client";

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useBreakpoint } from "@/hooks/use-breakpoints";
import { usePOS } from "@/lib/modules/pos/state";
import { PosOrderProducts } from "./pos-order-products";

export const MobilePosOrder = () => {
  const { posData, toggleCart } = usePOS();
  const isLarge = useBreakpoint(1024);

  if (!isLarge) {
    return (
      <Sheet onOpenChange={toggleCart} open={posData.open}>
        <SheetContent className="w-svw sm:max-w-md">
          <SheetTitle className="sr-only" />
          <PosOrderProducts />
        </SheetContent>
      </Sheet>
    );
  }

  return null;
};
