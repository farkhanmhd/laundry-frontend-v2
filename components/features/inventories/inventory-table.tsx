import { TableProvider } from "@/components/table/context";
import { DataTableQuerySearch } from "@/components/table/data-table-query-search";
import { TableViewProvider } from "@/components/table/table-view-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getInventories } from "@/lib/modules/inventories/data";
import { cardShadowStyle } from "@/lib/utils";
import { columns } from "./columns";

const InventoryTable = async () => {
  const data = await getInventories();
  return (
    <TableProvider columns={columns}>
      <Card
        className="gap-0 overflow-hidden p-0 dark:bg-background"
        style={cardShadowStyle}
      >
        <CardHeader className="flex items-center justify-between border-b px-4 pt-6 pb-0 dark:bg-background">
          <CardTitle className="hidden md:block">Inventories</CardTitle>
          <DataTableQuerySearch className="w-80 max-w-80" />
        </CardHeader>
        <CardContent className="p-0 dark:bg-background">
          <TableViewProvider data={data} withPagination={false} />
        </CardContent>
      </Card>
    </TableProvider>
  );
};

export default InventoryTable;
