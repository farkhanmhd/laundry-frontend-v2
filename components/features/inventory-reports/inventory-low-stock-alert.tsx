import { AlertCircle, CheckCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InventoryReportsApi } from "@/lib/modules/inventory-reports/data";
import { cardShadowStyle } from "@/lib/utils";

export const InventoryLowStockAlert = async () => {
  const t = await getTranslations("InventoryReports.lowStockAlert");
  const data = await InventoryReportsApi.getLowStockItems();
  const lowStockCount = data?.length || 0;

  if (lowStockCount === 0) {
    return (
      <Alert
        className="border-green-500 text-green-700 dark:border-green-600 dark:text-green-400"
        style={cardShadowStyle}
      >
        <CheckCircle />
        <AlertTitle>{t("healthy")}</AlertTitle>
        <AlertDescription>{t("healthyDescription")}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert
      className="border-destructive text-destructive dark:border-destructive dark:bg-background dark:text-destructive"
      style={cardShadowStyle}
      variant="destructive"
    >
      <AlertCircle />
      <AlertTitle>{t("warning", { count: lowStockCount })}</AlertTitle>
      <AlertDescription>
        {t("description", {
          items: data?.map((item) => item.name).join(", ") ?? "",
        })}
      </AlertDescription>
    </Alert>
  );
};
