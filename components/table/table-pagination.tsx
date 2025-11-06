"use client";

import { DataTablePagination } from "@/components/table/data-table-pagination";
import { useTableContext } from "@/components/table/context";

export function TablePagination() {
  const { table } = useTableContext();
  return <DataTablePagination table={table} />;
}
