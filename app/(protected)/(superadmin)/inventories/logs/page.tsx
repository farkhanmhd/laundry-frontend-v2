import { Archive } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { InventoryCategoryOptions } from "@/components/features/inventories/inventory-category-options";
import { QueryFacetedFilter } from "@/components/table/query-faceted-filter";
import { TableToolbar } from "@/components/table/table-toolbar";
import { TableView } from "@/components/table/table-view";
import { InventoriesApi } from "@/lib/modules/inventories/data";
import {
  getInventoryHistoryQuery,
  type InventoryHistoryQueryProps,
} from "@/lib/search-params";

const Page = async (props: InventoryHistoryQueryProps) => {
  const query = await getInventoryHistoryQuery(props);
  const data = await InventoriesApi.getInventoryHistory(query);
  const inventoryOptions = await InventoriesApi.getInventoryOptions();
  const t = await getTranslations("Inventories");

  return (
    <>
      <TableToolbar searchPlaceholder={t("logs.searchByProduct")}>
        <QueryFacetedFilter
          icon={<Archive className="h-4 w-4" />}
          options={inventoryOptions}
          placeholder="Search Product"
          queryKey="inventoryIds"
          title="Product"
        />
        <InventoryCategoryOptions />
      </TableToolbar>
      <TableView data={data?.inventoryHistory} total={data?.total} />
    </>
  );
};

export default Page;
