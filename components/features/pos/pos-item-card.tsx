"use client";

import { List, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Client } from "@/components/utils/client";
import type { PosItemData } from "@/lib/modules/pos/data";
import { usePOS } from "@/lib/modules/pos/state";
import { formatToIDR, isBundlingPosItem } from "@/lib/utils";

interface Props {
  item: PosItemData;
}

export function PosItemCard({ item }: Props) {
  const { handleAddToCart } = usePOS();
  const t = useTranslations("CustomerOrders");

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
            <div className="flex items-center gap-2">
              {isBundlingPosItem(item) && (
                <HoverCard closeDelay={100} openDelay={10}>
                  <HoverCardTrigger asChild>
                    <Button
                      className="rounded-full"
                      size="icon"
                      variant="secondary"
                    >
                      <List />
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="flex w-64 flex-col gap-1.5">
                    <p className="font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                      {t("orderSummary.bundleIncludes")}
                    </p>
                    <ul className="space-y-1">
                      {item.items.map((subItem) => (
                        <li
                          className="flex items-center justify-between text-sm"
                          key={subItem.id}
                        >
                          <span className="font-medium">{subItem.name}</span>
                          <span className="text-muted-foreground tabular-nums">
                            x{subItem.quantity}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </HoverCardContent>
                </HoverCard>
              )}
              <Button
                className="rounded-full text-sm"
                onClick={() => handleAddToCart(item)}
                size="icon"
                type="button"
              >
                <ShoppingCart />
              </Button>
            </div>
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
