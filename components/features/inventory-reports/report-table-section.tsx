"use client";

import {
  useAdjustmentHistoryColumns,
  useInventoryUsageHistoryColumns,
  useRestockHistoryColumns,
} from "@/components/features/inventories/columns";
import { TableProvider } from "@/components/table/context";
import { TableViewProvider } from "@/components/table/table-view-provider";
import type {
  AdjustmentHistory,
  RestockHistory,
  UsageHistory,
} from "@/lib/modules/inventories/data";

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
