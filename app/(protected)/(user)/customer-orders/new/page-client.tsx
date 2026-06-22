"use client";

import { OrderItemCard } from "@/components/features/orders/order-item-card";
import type { PriceItemData } from "@/lib/modules/prices/data";

type Props = {
  items: PriceItemData[];
};

export function CustomerNewOrderPageClient({ items }: Props) {
  return (
    <section className="min-h-[calc(100dvh-128px)] space-y-6 p-6 md:min-h-[calc(100dvh-64px)]">
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2 md:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] lg:gap-6">
        {items.map((item) => (
          <li key={item.id}>
            <OrderItemCard item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}
