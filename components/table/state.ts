"use client";

import {
  type ColumnDef,
  type ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  useSearchQueryParams,
  useTablePaginationSearchParams,
} from "@/hooks/nuqs";

interface UseTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  manualPagination: boolean;
}

export const useTable = <TData extends { id: string }, TValue>({
  columns,
  manualPagination = false,
}: UseTableProps<TData, TValue>) => {
  // [FIX] The internal state must also be generic over TData
  const [internalData, setInternalData] = useState<TData[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useSearchQueryParams();
  const [rowSelection, setRowSelection] = useState({});
  const [paginationState, setPaginationState] =
    useTablePaginationSearchParams();
  const [totalRow, setTotalRow] = useState<number | undefined>(undefined);
  const [manualPaginationState, setManualPaginationState] =
    useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
    });

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

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
    onPaginationChange: manualPagination
      ? (updater) => {
          setManualPaginationState((old) => {
            const newPaginationValue =
              updater instanceof Function ? updater(old) : updater;

            const value = newPaginationValue.pageIndex + 1;
            if (value === 1) {
              params.delete("page");
            } else {
              params.set("page", String(value));
            }
            return newPaginationValue;
          });

          replace(`${pathname}?${params.toString()}`);
        }
      : setPaginationState,
    autoResetPageIndex: !manualPagination,
    getRowId: (row) => row.id,
    manualPagination,
    rowCount: manualPagination ? totalRow : undefined,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      rowSelection,
      pagination: manualPagination ? manualPaginationState : paginationState,
    },
  });

  // This now correctly returns a setter for TData[]
  return {
    table,
    globalFilter,
    setGlobalFilter,
    setInternalData,
    setTotalRow,
    isManualPagination: manualPagination,
  };
};
