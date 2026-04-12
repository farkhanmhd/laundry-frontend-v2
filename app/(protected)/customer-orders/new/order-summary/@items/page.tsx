"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { CustomerOrderEmptyItems } from "@/components/features/customer-orders/customer-order-empty-items";
import { CustomerOrderItem } from "@/components/features/customer-orders/customer-order-item";
import { useCustomerOrder } from "@/components/features/customer-orders/state";
import { Button } from "@/components/ui/button";
import { Client } from "@/components/utils/client";
import type { PosOrderItem } from "@/lib/modules/pos/state";
import { cardShadowStyle } from "@/lib/utils";

export default function OrderSummaryItems() {
  const { customerCart, isPending } = useCustomerOrder();
  const t = useTranslations("CustomerOrders");
  return (
    <Client>
      <div className="rounded-xl bg-card" style={cardShadowStyle}>
        <ul className="flex flex-col divide-y divide-solid divide-accent p-4">
          {customerCart.items.length > 0 ? (
            customerCart.items.map((item) => (
              <li className="py-4 first:pt-0" key={item.id}>
                <CustomerOrderItem item={item as PosOrderItem} />
              </li>
            ))
          ) : (
            /* Empty State */
            <li>
              <CustomerOrderEmptyItems />
            </li>
          )}
        </ul>
        {customerCart.items.length > 0 && (
          <div className="flex items-center justify-between border-t p-4">
            <div className="space-y-1">
              <p className="font-semibold text-sm">
                {t("orderSummary.needAnythingElse")}
              </p>
              <p className="text-muted-foreground text-xs">
                {t("orderSummary.addOtherItems")}
              </p>
            </div>
            <Button disabled={isPending} size="sm" variant="outline">
              <Link href="/customer-orders/new">
                {t("orderSummary.addMore")}
              </Link>
            </Button>
          </div>
        )}
      </div>
    </Client>
  );
}
