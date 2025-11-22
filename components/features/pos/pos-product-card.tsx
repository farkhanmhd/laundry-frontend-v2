"use client";

import Image from "next/image";
import { toast } from "sonner";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Client } from "@/components/utils/client";
import { usePosProducts } from "@/hooks/state";
import { useBreakpoint } from "@/hooks/use-breakpoints";
import type { Inventory } from "@/lib/features/inventories/data";
import { cn, formatToIDR } from "@/lib/utils";

interface Props {
  product: Inventory;
}

export function PosProductCard({ product }: Props) {
  const { posProduct, setPosProduct } = usePosProducts();
  const isLarge = useBreakpoint(1024);

  const handleAddToOrder = () => {
    const existingItem = posProduct.items.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      setPosProduct((prev) => ({
        ...prev,
        items: posProduct.items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      }));
    } else {
      setPosProduct((prev) => ({
        ...prev,
        items: [...posProduct.items, { quantity: 1, product }],
      }));
    }

    if (!isLarge) {
      toast("1 Item added to cart", {
        action: {
          label: "View Cart",
          onClick: () => setPosProduct((prev) => ({ ...prev, open: true })),
        },
      });
    }
  };

  return (
    <Card
      aria-roledescription="button"
      className="h-full cursor-pointer overflow-hidden rounded-sm p-0 duration-200 hover:shadow-card active:bg-card-foreground/10"
      onClick={handleAddToOrder}
      style={{
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      }}
    >
      <CardContent className="flex flex-1 flex-col justify-between px-0">
        <Image
          alt="Product Image"
          className="aspect-square object-cover"
          height={1000}
          src={product.image || "/file.svg"}
          width={1000}
        />
        <CardFooter className="h-full flex-col items-start justify-between p-3">
          <span className="font-medium">{product.name}</span>
          <div className="flex w-full items-center justify-between">
            <div className="text-muted-foreground text-xs">
              Stock:{" "}
              <span
                className={cn({
                  "text-destructive": product.stock <= product.safetyStock,
                })}
              >
                {product.stock}
              </span>
            </div>
            <Client>
              <div className="font-semibold">{formatToIDR(product.price)}</div>
            </Client>
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
