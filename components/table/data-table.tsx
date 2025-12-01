import {
  type ColumnDef,
  flexRender,
  type Table as TableType,
} from "@tanstack/react-table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

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
      "h-[calc(100dvh-200px)] max-w-svw border-y md:h-[calc(100dvh-136px)]",
      className
    )}
  >
    <Table>
      <TableHeader className="sticky top-0 z-49 bg-background">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead className="px-4" key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              className={cn({
                "cursor-pointer": selectableRows,
              })}
              data-state={row.getIsSelected() && "selected"}
              key={row.id}
              onClick={() => selectableRows && row.toggleSelected()}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell className="px-4" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow className="h-full">
            <TableCell className="text-center" colSpan={columns.length}>
              No results found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
    <ScrollBar orientation="horizontal" />
  </ScrollArea>
);

export default DataTable;
