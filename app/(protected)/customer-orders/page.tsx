import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { OrderListItem } from "@/components/features/orders/order-list-item";
import { Button, buttonVariants } from "@/components/ui/button";
import { mockCustomerOrders } from "./data";

const MyOrdersPage = async () => {
  const t = await getTranslations("CustomerOrders");

  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="mb-8 flex flex-col gap-3">
        <div className="flex justify-between gap-3">
          <h1 className="font-bold text-2xl tracking-tight">{t("title")}</h1>
          <Link className={buttonVariants()} href="/customer-orders/new">
            <span> {t("newOrder")}</span>
          </Link>
        </div>
        <p className="text-muted-foreground text-sm">{t("description")}</p>
      </div>
      <div className="grid gap-4">
        {mockCustomerOrders.map((order) => (
          <OrderListItem key={order.id} order={order} shadow />
        ))}
        <Button variant="secondary">{t("loadMore")}</Button>
      </div>
    </div>
  );
};

export default MyOrdersPage;
