import { PackageCheck } from "lucide-react";
import { LowStockItem } from "@/components/features/inventories/low-stock-item";
import { CardContent } from "@/components/ui/card";
import {
  AdminDashboardApi,
  type LowStockItem as LowStockItemType,
} from "@/lib/modules/admin-dashboard/data";

const LowStockPage = async () => {
  const lowStockItems = await AdminDashboardApi.getLowStock();

  return (
    <CardContent>
      {lowStockItems.length === 0 ? (
        <div className="flex h-32 flex-col items-center justify-center gap-2 text-muted-foreground">
          <PackageCheck className="h-10 w-10" />
          <p className="text-sm">All items are well-stocked</p>
        </div>
      ) : (
        <div className="space-y-2">
          {lowStockItems.map((item: LowStockItemType) => (
            <LowStockItem item={item} key={item.id} />
          ))}
        </div>
      )}
    </CardContent>
  );
};

export default LowStockPage;
