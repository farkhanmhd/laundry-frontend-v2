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
import { usePosProducts } from "@/hooks/state";
import { PosOrderProducts } from "./pos-order-products";

const OrderProductsSheet = () => {
  const { posProduct } = usePosProducts();

  return (
    <Sheet modal={false}>
      <SheetTrigger asChild>
        <Button className="relative h-12 w-12 rounded-full" variant="secondary">
          <ShoppingCart
            className="text-primary"
            style={{ width: "26px", height: "26px" }}
          />
          {posProduct.items.length > 0 && (
            <Badge className="-top-1 -right-1 absolute rounded-full">
              {posProduct.items.length}
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
