"use client";

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { usePosProducts } from "@/hooks/state";
import { PosOrderProducts } from "./pos-order-products";

export const PosOrder = () => {
  const { posProduct, close } = usePosProducts();

  return (
    <Sheet onOpenChange={close} open={posProduct.open}>
      <SheetContent className="w-svw sm:max-w-md">
        <SheetTitle className="hidden" />
        <PosOrderProducts />
      </SheetContent>
    </Sheet>
  );
};
