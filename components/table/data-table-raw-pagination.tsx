import type { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuerySearchParam } from "@/hooks/use-query-search-param";

interface DataTableRawPaginationProps<TData> {
  table: Table<TData>;
}

export function DataTableRawPagination<TData>({
  table,
}: DataTableRawPaginationProps<TData>) {
  const {
    value: currentPage,
    setQuery,
    removeQuery,
  } = useQuerySearchParam("page");
  const { setQuery: setRows, removeQuery: removeRows } =
    useQuerySearchParam("rows");

  const handleFirstPage = () => {
    table.setPageIndex(0);
    removeQuery();
  };

  const handleLastPage = () => {
    table.setPageIndex(table.getPageCount() - 1);
    setQuery(table.getPageCount().toString());
  };

  const handleNextPage = () => {
    const targetPage = currentPage.length > 0 ? Number(currentPage[0]) + 1 : 2;
    setQuery(String(targetPage));
    table.nextPage();
  };

  const handlePreviousPage = () => {
    const targetPage = Number(currentPage[0]) - 1;
    table.previousPage();
    if (targetPage === 0) {
      removeQuery();
    } else {
      setQuery(String(targetPage));
    }
  };

  const handleRowsChange = (value: string) => {
    table.setPageSize(Number(value));
    table.setPageIndex(0);
    if (value === "10") {
      removeRows();
    } else {
      setRows(value);
    }
    removeQuery();
  };

  return (
    <div className="flex items-center justify-between border-t p-2">
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
            onValueChange={handleRowsChange}
            value={`${table.getState().pagination.pageSize}`}
          >
            <SelectTrigger className="w-17.5 dark:bg-background">
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
        <div className="flex items-center gap-2">
          <Button
            className="hidden lg:flex"
            disabled={!table.getCanPreviousPage()}
            onClick={handleFirstPage}
            size="icon"
            variant="outline"
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button
            disabled={!table.getCanPreviousPage()}
            onClick={handlePreviousPage}
            size="icon"
            variant="outline"
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            disabled={!table.getCanNextPage()}
            onClick={handleNextPage}
            size="icon"
            variant="outline"
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            className="p-0 lg:flex"
            disabled={!table.getCanNextPage()}
            onClick={handleLastPage}
            size="icon"
            variant="outline"
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
