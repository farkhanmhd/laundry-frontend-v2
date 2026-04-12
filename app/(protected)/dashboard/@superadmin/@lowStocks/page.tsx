import { PackageCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { LowStockItem } from "@/components/features/inventories/low-stock-item";
import { CardContent } from "@/components/ui/card";
import { AdminDashboardApi } from "@/lib/modules/admin-dashboard/data";

const LowStockPage = async () => {
  const lowStockItems = await AdminDashboardApi.getLowStock();
  const t = await getTranslations("Dashboard.superadmin.lowStock");

  return (
    <CardContent className="h-full">
      {lowStockItems.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
          <PackageCheck className="h-10 w-10" />
          <p className="text-sm">{t("allHealthy")}</p>
        </div>
      ) : (
        <div className="space-y-2">
          {lowStockItems.map((item) => (
            <LowStockItem item={item} key={item.id} />
          ))}
        </div>
      )}
    </CardContent>
  );
};

export default LowStockPage;
