"use client";

import {
  type ColumnDef,
  type ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import {
  useSearchQueryParams,
  useTablePaginationSearchParams,
} from "@/lib/search-params";

interface UseTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
}

export const useTable = <TData extends { id: string}, TValue>({
  columns,
}: UseTableProps<TData, TValue>) => {
  // [FIX] The internal state must also be generic over TData
  const [internalData, setInternalData] = useState<TData[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useSearchQueryParams();
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useTablePaginationSearchParams();

  // [FIX] Explicitly pass the TData generic to useReactTable
  const table = useReactTable<TData>({
    columns,
    data: internalData,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    autoResetPageIndex: true,
    getRowId: (row) => row.id,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      rowSelection,
      pagination,
    },
  });

  // This now correctly returns a setter for TData[]
  return { table, globalFilter, setGlobalFilter, setInternalData };
};
