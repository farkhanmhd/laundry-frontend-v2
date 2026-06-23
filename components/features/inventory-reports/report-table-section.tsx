"use client";

import {
  useAdjustmentHistoryColumns,
  useInventoryLogsColumns,
  useInventoryUsageHistoryColumns,
  useRestockHistoryColumns,
} from "@/components/features/inventories/columns";
import { TableProvider } from "@/components/table/context";
import { TableViewProvider } from "@/components/table/table-view-provider";
import { Card, CardContent } from "@/components/ui/card";
import type {
  AdjustmentHistory,
  InventoryLog,
  RestockHistory,
  UsageHistory,
} from "@/lib/modules/inventories/data";
import { cardShadowStyle } from "@/lib/utils";

export function AdjustmentHistoryTableSection({
  data,
  total,
}: {
  data?: AdjustmentHistory[];
  total?: number;
}) {
  const columns = useAdjustmentHistoryColumns();

  return (
    <TableProvider columns={columns} manualPagination>
      <TableViewProvider data={data} total={total} withPagination />
    </TableProvider>
  );
}

export function RestockHistoryTableSection({
  data,
  total,
}: {
  data?: RestockHistory[];
  total?: number;
}) {
  const columns = useRestockHistoryColumns();

  return (
    <TableProvider columns={columns} manualPagination>
      <TableViewProvider data={data} total={total} withPagination />
    </TableProvider>
  );
}

export function InventoryLogsTableSection({
  data,
  total,
}: {
  data?: InventoryLog[];
  total?: number;
}) {
  const columns = useInventoryLogsColumns();

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
}

export function UsageHistoryTableSection({
  data,
  total,
}: {
  data?: UsageHistory[];
  total?: number;
}) {
  const columns = useInventoryUsageHistoryColumns();

  return (
    <TableProvider columns={columns} manualPagination>
      <TableViewProvider data={data} total={total} withPagination />
    </TableProvider>
  );
}
