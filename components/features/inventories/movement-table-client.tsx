"use client";

import { TableProvider } from "@/components/table/context";
import { TableViewProvider } from "@/components/table/table-view-provider";
import { Card, CardContent } from "@/components/ui/card";
import type { MovementHistory } from "@/lib/modules/inventories/data";
import { cardShadowStyle } from "@/lib/utils";
import { useMovementHistoryColumns } from "./columns";

interface Props {
  data: MovementHistory[];
  total?: number;
}

export const MovementTableClient = ({ data, total }: Props) => {
  const columns = useMovementHistoryColumns();

  return (
    <TableProvider columns={columns} manualPagination>
      <Card
        className="gap-0 overflow-hidden p-0 dark:bg-background"
        style={cardShadowStyle}
      >
        <CardContent className="p-0 dark:bg-background">
          <TableViewProvider data={data} total={total} withPagination />
        </CardContent>
      </Card>
    </TableProvider>
  );
};
