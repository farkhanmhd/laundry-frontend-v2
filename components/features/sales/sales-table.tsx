import type { ColumnDef } from "@tanstack/react-table";
import { TableProvider } from "@/components/table/context";
import { TableViewProvider } from "@/components/table/table-view-provider";
import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { cardShadowStyle } from "@/lib/utils";

interface SalesTableProps<T> {
  items: T[];
  columns: ColumnDef<T, unknown>[];
  total: number;
  tab: string;
}

export const SalesTable = <T extends { id: string }>({
  items,
  total,
  columns,
  tab,
}: SalesTableProps<T>) => {
  return (
    <TabsContent className="m-0 bg-transparent" value={tab}>
      <TableProvider columns={columns} manualPagination>
        <Card
          className="overflow-hidden border-border bg-none bg-transparent p-0"
          style={cardShadowStyle}
        >
          <CardContent className="p-0">
            <TableViewProvider
              data={items}
              total={total}
              withPagination={false}
            />
          </CardContent>
        </Card>
      </TableProvider>
    </TabsContent>
  );
};
