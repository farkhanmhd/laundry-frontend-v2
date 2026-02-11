import { AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InventoryReportsApi } from "@/lib/modules/inventory-reports/data";
import { cardShadowStyle } from "@/lib/utils";

export const InventoryLowStockAlert = async () => {
  const data = await InventoryReportsApi.getLowStockItems();
  const lowStockCount = data?.length || 0;

  if (lowStockCount === 0) {
    return (
      <Alert
        className="border-green-500 text-green-700 dark:border-green-600 dark:text-green-400"
        style={cardShadowStyle}
      >
        <CheckCircle />
        <AlertTitle>All stock levels are healthy</AlertTitle>
        <AlertDescription>
          No items are currently below safety stock levels.
        </AlertDescription>
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
      <AlertTitle>
        Low stock warning: {lowStockCount} item{lowStockCount > 1 ? "s" : ""}{" "}
        need restocking
      </AlertTitle>
      <AlertDescription>
        The following items are below safety stock levels:{" "}
        {data?.map((item) => item.name).join(", ")}
      </AlertDescription>
    </Alert>
  );
};
