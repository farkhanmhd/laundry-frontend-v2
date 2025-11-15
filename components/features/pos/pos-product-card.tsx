"use client";

import Image from "next/image";
import { toast } from "sonner";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { usePosProducts } from "@/hooks/state";
import type { Inventory } from "@/lib/features/inventories/data";

interface Props {
  product: Inventory;
}

export function PosProductCard({ product }: Props) {
  const { posProduct, setPosProduct } = usePosProducts();

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

    toast("1 Item added to cart", {
      action: {
        label: "View Cart",
        onClick: () => setPosProduct((prev) => ({ ...prev, open: true })),
      },
    });
  };

  return (
    <Card
      aria-roledescription="button"
      className="aspect-square cursor-pointer rounded-none p-3 shadow-none duration-200 hover:shadow-card active:bg-card-foreground/10"
      onClick={handleAddToOrder}
    >
      <CardContent className="flex flex-1 flex-col justify-between gap-4 px-0">
        <Image
          alt="Product Image"
          className="aspect-square rounded-md object-cover"
          height={1000}
          src={product.image || "/file.svg"}
          width={1000}
        />
        <CardFooter className="flex items-center justify-between p-0">
          <span className="line-clamp-1 font-medium">{product.name}</span>
          <span className="font-semibold text-lg">{product.price}</span>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
