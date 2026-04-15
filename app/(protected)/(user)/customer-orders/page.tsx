import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { CustomerOrderList } from "@/components/features/orders/customer-order-list";
import { buttonVariants } from "@/components/ui/button";

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
      <CustomerOrderList />
    </div>
  );
};

export default MyOrdersPage;
