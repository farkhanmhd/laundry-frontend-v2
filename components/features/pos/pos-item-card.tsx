"use client";

import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import type { PosItemData } from "@/app/(protected)/(superadmin)/pos/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Client } from "@/components/utils/client";
import { useBreakpoint } from "@/hooks/use-breakpoints";
import { usePosOrderItem } from "@/lib/features/pos/state";
import { formatToIDR } from "@/lib/utils";

interface Props {
  item: PosItemData;
}

export function PosItemCard({ item }: Props) {
  const { posItem, setPosItem } = usePosOrderItem();
  const isLarge = useBreakpoint(1024);

  const handleAddToCart = () => {
    const existingItem = posItem.items.find((i) => i.id === item.id);

    if (existingItem) {
      setPosItem((prev) => ({
        ...prev,
        items: posItem.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      }));
    } else {
      const dynamicIdKey = `${item.itemType}id`;

      const newItem = {
        ...item,
        image: item.image ?? "",
        stock: item.stock ?? 0,
        note: "",
        quantity: 1,
        itemType: item.itemType as
          | "service"
          | "inventory"
          | "bundling"
          | "voucher",
        [dynamicIdKey]: item.id,
      };

      setPosItem((prev) => ({
        ...prev,
        items: [...prev.items, newItem],
      }));
    }

    if (!isLarge) {
      toast("1 Item added to cart", {
        action: {
          label: "View Cart",
          onClick: () => setPosItem((prev) => ({ ...prev, open: true })),
        },
      });
    }
  };

  return (
    <Card
      className="h-full overflow-hidden rounded-3xl p-2"
      style={{
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
      }}
    >
      <CardContent className="flex flex-1 flex-col justify-between gap-4 px-0">
        <Image
          alt="Product Image"
          className="aspect-square rounded-xl border border-muted object-cover"
          height={1000}
          src={item.image ?? "/file.svg"}
          width={1000}
        />

        <div className="px-2">
          <p className="font-bold lg:text-lg">{item.name}</p>
          <p className="line-clamp-2 text-muted-foreground text-xs lg:text-sm">
            {item.description}
          </p>
        </div>

        <CardFooter className="flex-col justify-between justify-self-end px-2 pb-2">
          <div className="flex w-full items-center justify-between">
            <Client>
              <div className="font-semibold text-sm lg:text-base">
                {formatToIDR(item.price)}
              </div>
            </Client>
            <Button
              className="rounded-full text-sm"
              onClick={handleAddToCart}
              size="icon"
              type="button"
            >
              <ShoppingCart />
            </Button>
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
