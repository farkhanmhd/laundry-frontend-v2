"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePOS } from "@/lib/modules/pos/state";
import { formatToIDR, MapItems } from "@/lib/utils";
import { PosOrderItem } from "./pos-order-item";

export function PosOrderProducts() {
  const { orderItems, totalAmount, totalItems, toggleCart } = usePOS();
  const isMobile = useIsMobile();
  const t = useTranslations("POS.orderProducts");

  return (
    <>
      <header className="z-50 flex h-20 items-center justify-center">
        <span className="font-semibold text-lg">{t("title")}</span>
      </header>
      <ScrollArea className="h-[calc(100dvh-72px-200px)] flex-1">
        <ul className="flex flex-col divide-y divide-dashed divide-primary/20 px-4">
          {orderItems.length === 0 ? (
            <li className="flex h-33.25 items-center justify-center border-b border-dashed text-secondary-foreground/70">
              {t("noItems")}
            </li>
          ) : (
            <MapItems
              of={orderItems}
              render={(item, index) => (
                <li className="w-full" key={`${item.id}-${index}`}>
                  <PosOrderItem item={item} />
                </li>
              )}
            />
          )}
        </ul>
      </ScrollArea>
      <footer className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between font-semibold text-lg">
          <span>{t("total")}</span>
          <span>{formatToIDR(totalAmount)}</span>
        </div>
        <div>
          <Button
            className="h-12 w-full items-center px-0"
            disabled={totalItems === 0}
            onClick={() => {
              if (isMobile) {
                toggleCart();
              }
            }}
          >
            <Link
              className="flex h-12 w-full items-center justify-center text-lg"
              href="/pos/summary"
            >
              {t("orderSummary")}
            </Link>
          </Button>
        </div>
      </footer>
    </>
  );
}
