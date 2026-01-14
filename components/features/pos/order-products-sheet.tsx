"use client";

import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePOS } from "@/lib/modules/pos/state";
import { PosOrderProducts } from "./pos-order-products";

const OrderProductsSheet = () => {
  const { posData } = usePOS();

  return (
    <Sheet modal={false}>
      <SheetTrigger asChild>
        <Button className="relative h-12 w-12 rounded-full" variant="secondary">
          <ShoppingCart
            className="text-primary"
            style={{ width: "26px", height: "26px" }}
          />
          {posData.items.length > 0 && (
            <Badge className="-top-1 -right-1 absolute rounded-full">
              {posData.items.length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full max-w-full sm:max-w-full">
        <SheetTitle className="hidden" />
        <div className="h-full">
          <PosOrderProducts />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default OrderProductsSheet;
