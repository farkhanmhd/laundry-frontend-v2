import { memberSpendingColumns } from "@/components/features/member-reports/columns";
import { TableProvider } from "@/components/table/context";
import { DataTableQuerySearch } from "@/components/table/data-table-query-search";
import { TableViewProvider } from "@/components/table/table-view-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MemberReportsApi } from "@/lib/modules/member-reports/data";
import type { SearchQuery } from "@/lib/search-params";
import { cardShadowStyle } from "@/lib/utils";

interface MemberSpendingTableProps {
  query: SearchQuery;
}

const MemberSpendingTable = async ({ query }: MemberSpendingTableProps) => {
  const data = await MemberReportsApi.getMembersWithSpending(query);
  return (
    <TableProvider columns={memberSpendingColumns} manualPagination>
      <Card
        className="gap-0 overflow-hidden p-0 dark:bg-background"
        style={cardShadowStyle}
      >
        <CardHeader className="flex items-center justify-between border border-b px-4 pt-6 pb-0 dark:bg-background">
          <CardTitle>Member Spending</CardTitle>
          <DataTableQuerySearch />
        </CardHeader>
        <CardContent className="p-0 dark:bg-background">
          <TableViewProvider
            data={data.members}
            total={data.total}
            withPagination
          />
        </CardContent>
      </Card>
    </TableProvider>
  );
};

export default MemberSpendingTable;
