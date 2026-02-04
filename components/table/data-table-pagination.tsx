import type { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryParams } from "@/hooks/use-query-params";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { setQuery, removeQuery } = useQueryParams(params);
  const pathname = usePathname();
  const { replace } = useRouter();

  return (
    <div className="flex items-center justify-between px-2">
      <div className="hidden flex-1 text-muted-foreground text-sm md:block">
        {table.getFilteredSelectedRowModel().rows.length > 0 ? (
          <span>
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </span>
        ) : (
          <span className="line-clamp-1">
            Showing {table.getRowModel().rows.length} row(s).
          </span>
        )}
      </div>
      <div className="flex w-full items-center justify-between space-x-6 md:w-auto lg:space-x-8">
        <div className="flex items-center space-x-2">
          <Select
            onValueChange={(value) => {
              table.setPageSize(Number(value));
              table.setPageIndex(0);
              if (value === "50") {
                removeQuery("rows");
              } else {
                setQuery("rows", value);
              }
              removeQuery("page");
              replace(`${pathname}?${params.toString()}`);
            }}
            value={`${table.getState().pagination.pageSize}`}
          >
            <SelectTrigger className="w-17.5 rounded-none border-y-0 dark:bg-background">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="hidden w-25 items-center justify-center font-medium text-sm md:flex">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center">
          <Button
            className="hidden rounded-none p-0 lg:flex"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.setPageIndex(0)}
            variant="ghost"
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button
            className="rounded-none p-0"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            variant="ghost"
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            className="rounded-none p-0"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            variant="ghost"
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            className="hidden rounded-none p-0 lg:flex"
            disabled={!table.getCanNextPage()}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            variant="ghost"
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
