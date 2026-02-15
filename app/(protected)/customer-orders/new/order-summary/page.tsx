"use client";

import { Plus, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { OrderSummaryAddress } from "@/components/features/orders/order-summary-address";
import {
  OrderSummaryItem,
  type PosOrderItem,
} from "@/components/features/orders/order-summary-item";
import { OrderSummaryVoucher } from "@/components/features/orders/order-summary-voucher";
import { useCustomerOrder } from "@/components/features/orders/state";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { cardShadowStyle } from "@/lib/utils";

export default function OrderSummaryPage() {
  const t = useTranslations("CustomerOrders");
  const { customerCart } = useCustomerOrder();
  return (
    <div className="mx-auto min-h-[calc(100dvh-144px)] max-w-7xl p-4 md:min-h-[calc(100dvh-64px)]">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
        <div className="space-y-4 lg:col-span-8">
          <OrderSummaryAddress
            address="Jalan Adam Malik No. 1"
            label={t("orderSummary.pickupLocation")}
            name="Office"
            onChangeLocation={() => console.log("Change location clicked")}
            onEditAddress={() => console.log("Edit clicked")}
            onNotes={() => console.log("Notes clicked")}
          />
          <div className="rounded-xl bg-card" style={cardShadowStyle}>
            <ul className="flex flex-col divide-y divide-solid divide-accent p-4">
              {customerCart.length > 0 ? (
                customerCart.map((item) => (
                  <li className="py-4 first:pt-0" key={item.id}>
                    <OrderSummaryItem item={item as PosOrderItem} />
                  </li>
                ))
              ) : (
                /* Empty State */
                <li>
                  <Empty>
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <ShoppingCart />
                      </EmptyMedia>
                      <EmptyTitle>{t("orderSummary.noItemsAdded")}</EmptyTitle>
                      <EmptyDescription>
                        {t("orderSummary.cartEmpty")}
                      </EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent>
                      <Link
                        className={buttonVariants({ variant: "secondary" })}
                        href="/customer-orders/new"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        {t("orderSummary.addItem")}
                      </Link>
                    </EmptyContent>
                  </Empty>
                </li>
              )}
            </ul>
            {customerCart.length > 0 && (
              <div className="flex items-center justify-between border-t p-4">
                <div className="space-y-1">
                  <p className="font-semibold text-sm">
                    {t("orderSummary.needAnythingElse")}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {t("orderSummary.addOtherItems")}
                  </p>
                </div>
                <Link
                  className={buttonVariants({ variant: "outline", size: "sm" })}
                  href="/customer-orders/new"
                >
                  {t("orderSummary.addMore")}
                </Link>
              </div>
            )}
          </div>
          <OrderSummaryVoucher />
        </div>
        <div className="space-y-3 lg:sticky lg:top-4 lg:col-span-4">
          <Button className="w-full">{t("orderSummary.requestPickup")}</Button>
        </div>
      </div>
    </div>
  );
}
