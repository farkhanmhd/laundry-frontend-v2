import { getTranslations } from "next-intl/server";
import { DeliveriesItem } from "@/components/features/deliveries/deliveries-item";
import { Button } from "@/components/ui/button";
import { mockDeliveries } from "./data";

const MyOrdersPage = async () => {
  const t = await getTranslations("CustomerDeliveries");

  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="mb-8 flex flex-col gap-1.5">
        <h1 className="font-bold text-2xl tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground text-sm">{t("description")}</p>
      </div>
      <div className="grid gap-4">
        {mockDeliveries.map((delivery) => (
          <DeliveriesItem delivery={delivery} key={delivery.id} shadow />
        ))}
        <Button variant="secondary">{t("loadMore")}</Button>
      </div>
    </div>
  );
};

export default MyOrdersPage;
