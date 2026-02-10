"use client"

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type ColumnDef,
  useReactTable,
} from "@tanstack/react-table"
import { useQueryState } from "nuqs"
import { useState } from "react"

export function useTable<T extends { id: string }>({
  columns,
}: {
  columns: ColumnDef<T, unknown>[]
}) {
  const [data, setData] = useState<T[]>([])
  const [globalFilter, setGlobalFilter] = useQueryState("search", {
    shallow: false,
    defaultValue: "",
    history: 'replace',
    limitUrlUpdates: {
      method: 'debounce',
      timeMs: 300
    }
  })

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: "auto",
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  })

  return {
    table,
    globalFilter,
    setGlobalFilter,
    setInternalData: setData,
  }
}
