import type { ColumnDef, Table as TableType } from "@tanstack/react-table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { DataTableRaw } from "./data-table-raw";

type Props<TData, TValue> = {
  table: TableType<TData>;
  columns: ColumnDef<TData, TValue>[];
  selectableRows?: boolean;
  className?: string;
};

const DataTable = <TData, TValue>({
  table,
  columns,
  selectableRows = false,
  className,
}: Props<TData, TValue>) => (
  <ScrollArea
    className={cn(
      "h-[calc(100dvh-200px)] max-w-svw overflow-hidden border-y md:h-[calc(100dvh-136px)] md:max-w-[calc(100svw-80px)]",
      className
    )}
  >
    <DataTableRaw
      columns={columns}
      selectableRows={selectableRows}
      table={table}
    />
    <ScrollBar orientation="horizontal" />
  </ScrollArea>
);

export default DataTable;
