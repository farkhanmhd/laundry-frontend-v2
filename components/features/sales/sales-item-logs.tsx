import { salesItemLogsColumns } from "@/components/features/sales/columns";
import { TableProvider } from "@/components/table/context";
import { TableViewProvider } from "@/components/table/table-view-provider";
import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { type BestSellersQuery, SalesApi } from "@/lib/modules/sales/data";
import { cardShadowStyle } from "@/lib/utils";

interface Props {
  query: BestSellersQuery;
}

const SalesItemLogs = async ({ query }: Props) => {
  const data = await SalesApi.getItemLogs(query);

  return (
    <TabsContent className="m-0 bg-transparent" value="items">
      <TableProvider columns={salesItemLogsColumns} manualPagination>
        <Card
          className="overflow-hidden border-border bg-none bg-transparent p-0"
          style={cardShadowStyle}
        >
          <CardContent className="p-0">
            <TableViewProvider data={data.items} total={data.meta.total} />
          </CardContent>
        </Card>
      </TableProvider>
    </TabsContent>
  );
};

export default SalesItemLogs;
