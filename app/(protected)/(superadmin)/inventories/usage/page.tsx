import { Archive, Download } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { QueryFacetedFilter } from "@/components/table/query-faceted-filter";
import { TableViewProvider } from "@/components/table/table-view-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { InventoriesApi } from "@/lib/modules/inventories/data";
import {
  getInventoryHistoryQuery,
  type InventoryHistoryQueryProps,
} from "@/lib/search-params";
import { cardShadowStyle } from "@/lib/utils";

const Page = async (props: InventoryHistoryQueryProps) => {
  const t = await getTranslations("Inventories");
  const query = await getInventoryHistoryQuery(props);
  const data = await InventoriesApi.getUsageHistory(query);

  const inventoryOptions = await InventoriesApi.getInventoryOptions();

  return (
    <div className="space-y-6 pb-6">
      <div className="flex items-center justify-between">
        <div className="hidden font-semibold text-2xl md:block">
          {t("logs.usageTitle")}
        </div>
        <div className="flex items-center gap-3">
          <Button style={cardShadowStyle} variant="outline">
            <Download />
            Export
          </Button>
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
      <Card
        className="gap-0 overflow-hidden p-0 dark:bg-background"
        style={cardShadowStyle}
      >
        <CardContent className="p-0 dark:bg-background">
          <TableViewProvider
            data={data?.inventoryUsageHistory}
            total={data?.total}
            withPagination
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
