"use client";

import { useTableContext } from "@/components/table/context";
import { DataTablePagination } from "@/components/table/data-table-pagination";

export function TablePagination() {
  const { table } = useTableContext();
  return <DataTablePagination table={table} />;
}
