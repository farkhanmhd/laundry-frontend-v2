import { Archive } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { InventoryAdjustmentsExportButton } from "@/components/features/inventories/inventory-adjustments-export-button";
import { QueryFacetedFilter } from "@/components/table/query-faceted-filter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InventoriesApi } from "@/lib/modules/inventories/data";
import {
  getInventoryHistoryQuery,
  type InventoryHistoryQueryProps,
} from "@/lib/search-params";
import { cardShadowStyle } from "@/lib/utils";
import { AdjustmentHistoryTableSection } from "./report-table-section";

export const MonthlyContent = async (props: InventoryHistoryQueryProps) => {
  const t = await getTranslations("Inventories");
  const query = await getInventoryHistoryQuery(props);
  const data = await InventoriesApi.getInventoryHistory(query);

  const inventoryOptions = await InventoriesApi.getInventoryOptions();

  return (
    <Card
      className="gap-0 overflow-hidden p-0 dark:bg-background"
      style={cardShadowStyle}
    >
      <CardHeader className="gap-0 border-b px-4 pt-6 dark:bg-background [.border-b]:pb-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base md:text-lg">
            {t("logs.adjustmentTitle")}
          </CardTitle>
          <div className="flex gap-2">
            <InventoryAdjustmentsExportButton
              from={query.from}
              inventoryIds={query.inventoryIds}
              to={query.to}
            />
            <QueryFacetedFilter
              className="rounded-sm"
              icon={<Archive className="h-4 w-4" />}
              options={inventoryOptions}
              placeholder="Search Product"
              queryKey="inventoryIds"
              title="Product"
              variant="outline"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 dark:bg-background">
        <AdjustmentHistoryTableSection
          data={data?.inventoryHistory}
          total={data?.total}
        />
      </CardContent>
    </Card>
  );
};
