"use client";

import DataTable from "@/components/table/data-table";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { use, useEffect } from "react";
import { useTableContext } from "@/components/table/context";

interface ProductsTableProps<TData extends { id: string }> {
  data: TData[] | undefined;
}

export const TableView = <TData extends { id: string }>({ data }: ProductsTableProps<TData>) => {
  const { table, setInternalData, columns } = useTableContext();
  const { open } = useSidebar();

  useEffect(() => {
    if (data) {
      setInternalData(data);
    }
  }, [data, setInternalData]);

  return (
    <DataTable
      className={cn("max-w-svw flex-1 border-t-muted-foreground/60 duration-200 md:max-w-[calc(100svw-66px)] dark:border-t-muted", {
        "md:max-w-[calc(100svw-256px)]": open,
        "md:max-w-[calc(100svw-66px)]": !open,
      })}
      columns={columns}
      table={table}
    />
  );
};
