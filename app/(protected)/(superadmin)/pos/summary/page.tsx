"use client";

import { Plus, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { PosSummaryItem } from "@/components/features/pos/pos-summary-item";
import { OrderSummaryVoucher } from "@/components/features/orders/order-summary-voucher";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { usePosOrderItem } from "@/lib/modules/pos/state";
import { cardShadowStyle, formatToIDR } from "@/lib/utils";

export default function PosSummaryPage() {
  const { posItem, totalAmount } = usePosOrderItem();
  return (
    <div className="mx-auto min-h-[calc(100dvh-128px)] max-w-3xl space-y-4 p-4 md:min-h-[calc(100dvh-64px)]">
      <div className="rounded-xl bg-card" style={cardShadowStyle}>
        <ul className="flex flex-col divide-y divide-solid divide-accent p-4">
          {posItem.items.length > 0 ? (
            posItem.items.map((item) => (
              <li className="py-4 first:pt-0" key={item.id}>
                <PosSummaryItem item={item} />
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
                  <EmptyTitle>No items added</EmptyTitle>
                  <EmptyDescription>
                    Your cart is currently empty.
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <Link
                    className={buttonVariants({ variant: "secondary" })}
                    href="/pos"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Item
                  </Link>
                </EmptyContent>
              </Empty>
            </li>
          )}
        </ul>
        {posItem.items.length > 0 && (
          <div className="flex items-center justify-between border-t p-4">
            <div className="space-y-1">
              <p className="font-semibold text-sm">Need anything else?</p>
              <p className="text-muted-foreground text-xs">
                Add other items, if you want.
              </p>
            </div>
            <Link
              className={buttonVariants({ variant: "outline", size: "sm" })}
              href="/pos"
            >
              Add More
            </Link>
          </div>
        )}
      </div>
      <OrderSummaryVoucher />
      <Button className="w-full">Place Order {formatToIDR(totalAmount)}</Button>
    </div>
  );
}
