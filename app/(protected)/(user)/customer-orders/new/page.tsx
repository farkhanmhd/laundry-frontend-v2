import { OrderItemCard } from "@/components/features/orders/order-item-card";
import { PosApi, type PosItemData } from "@/lib/modules/pos/data";

export default async function NewOrderPage() {
  const data = (await PosApi.getPosItems()) as PosItemData[] | undefined;
  return (
    <section className="min-h-[calc(100dvh-128px)] p-6 md:min-h-[calc(100dvh-64px)]">
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2 md:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] lg:gap-6">
        {data?.map((item) => (
          <li key={item.id}>
            <OrderItemCard item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}
