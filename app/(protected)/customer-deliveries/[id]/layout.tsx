import { getTranslations } from "next-intl/server";
import type React from "react";

interface Props {
  children: React.ReactNode;
}

const CustomerDeliveryDetailLayout = async ({ children }: Props) => {
  const t = await getTranslations("CustomerDeliveries.deliveryDetail");
  return (
    <div className="mx-auto max-w-3xl space-y-6 bg-background p-6 text-foreground">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="font-bold text-2xl text-foreground tracking-tight">
            {t("title")}
          </h1>
          <p className="mt-1 text-muted-foreground text-sm">
            {t("description")}
          </p>
        </div>
      </div>
      {children}
    </div>
  );
};

export default CustomerDeliveryDetailLayout;
