import { Archive, Settings } from "lucide-react";
import { inventoryCategoryOptions } from "@/components/features/inventories/columns";
import { QueryFacetedFilter } from "@/components/table/query-faceted-filter";
import { TableToolbar } from "@/components/table/table-toolbar";
import { TableView } from "@/components/table/table-view";
import {
  getInventoryHistory,
  getInventoryOptions,
} from "@/lib/modules/inventories/data";
import {
  getInventoryHistoryQuery,
  type InventoryHistoryQueryProps,
} from "@/lib/search-params";
import { Suspense } from "react";

const Page = async (props: InventoryHistoryQueryProps) => {
  const query = await getInventoryHistoryQuery(props);
  const data = await getInventoryHistory(query);
  const inventoryOptions = await getInventoryOptions();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TableToolbar searchPlaceholder="Search by Product name or Order ID">
        <QueryFacetedFilter
          icon={<Archive className="h-4 w-4" />}
          options={inventoryOptions}
          placeholder="Search Product"
          queryKey="inventoryIds"
          title="Product"
        />
        <QueryFacetedFilter
          icon={<Settings className="h-4 w-4" />}
          options={inventoryCategoryOptions}
          placeholder="Search Category"
          queryKey="category"
          title="Category"
        />
      </TableToolbar>
      <TableView data={data?.inventoryHistory} total={data?.total} />
    </Suspense>
  );
};

export default Page;
