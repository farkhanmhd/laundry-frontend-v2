import { Plus, TableOfContents } from "lucide-react";
import Link from "next/link";
import { TableProvider } from "@/components/table/context";
import { DataTableQuerySearch } from "@/components/table/data-table-query-search";
import { TableViewProvider } from "@/components/table/table-view-provider";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getInventories } from "@/lib/modules/inventories/data";
import { cardShadowStyle, cn } from "@/lib/utils";
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
          <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
            <DataTableQuerySearch className="w-full md:w-80 md:max-w-80" />
            <div className="grid grid-cols-2 gap-3">
              <Link
                className={cn(buttonVariants({ variant: "outline" }))}
                href="/inventories/logs"
              >
                <TableOfContents />
                Logs
              </Link>
              <Link className={cn(buttonVariants())} href="/inventories/new">
                <Plus />
                Inventory
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 dark:bg-background">
          <TableViewProvider data={data} withPagination={false} />
        </CardContent>
      </Card>
    </TableProvider>
  );
};

export default InventoryTable;
