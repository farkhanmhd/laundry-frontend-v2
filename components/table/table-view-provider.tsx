"use client";

import { useEffect } from "react";
import { useTableContext } from "@/components/table/context";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { DataTableRaw } from "./data-table-raw";
import { DataTableRawPagination } from "./data-table-raw-pagination";

interface ProductsTableProps<TData extends { id: string }> {
  data: TData[] | undefined;
  total?: number;
  withPagination?: boolean;
}

export const TableViewProvider = <TData extends { id: string }>({
  data,
  total,
  withPagination = true,
}: ProductsTableProps<TData>) => {
  const { table, setInternalData, columns, setTotalRow } = useTableContext();

  useEffect(() => {
    if (data) {
      setInternalData(data);
    }

    if (total) {
      setTotalRow(total);
    }
  }, [data, setInternalData, total, setTotalRow]);

  return (
    <div>
      <ScrollArea
        className={cn(
          "max-w-[calc(100svw-48px)] overflow-hidden md:max-w-[calc(100svw-80px)]"
        )}
      >
        <DataTableRaw columns={columns} selectableRows={false} table={table} />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      {withPagination && <DataTableRawPagination table={table} />}
    </div>
  );
};
