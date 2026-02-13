import type { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuerySearchParam } from "@/hooks/use-query-search-param";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const t = useTranslations("Table.pagination");
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
    const targetPage = currentPage[0] ? Number(currentPage[0]) + 1 : 2;
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
    <div className="flex items-center justify-between px-2">
      <div className="hidden flex-1 text-muted-foreground text-sm md:block">
        {table.getFilteredSelectedRowModel().rows.length > 0 ? (
          <span>
            {t("selectedRows", {
              selected: table.getFilteredSelectedRowModel().rows.length,
              total: table.getFilteredRowModel().rows.length,
            })}
          </span>
        ) : (
          <span className="line-clamp-1">
            {t("showingRows", { count: table.getRowModel().rows.length })}
          </span>
        )}
      </div>
      <div className="flex w-full items-center justify-between space-x-6 md:w-auto lg:space-x-8">
        <div className="flex items-center space-x-2">
          <Select
            onValueChange={handleRowsChange}
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
        <div className="hidden items-center justify-center font-medium text-sm md:flex">
          {t("page", {
            current: table.getState().pagination.pageIndex + 1,
            total: table.getPageCount(),
          })}
        </div>
        <div className="flex items-center">
          <Button
            className="hidden rounded-none p-0 lg:flex"
            disabled={!table.getCanPreviousPage()}
            onClick={handleFirstPage}
            variant="ghost"
          >
            <span className="sr-only">{t("goToFirstPage")}</span>
            <ChevronsLeft />
          </Button>
          <Button
            className="rounded-none p-0"
            disabled={!table.getCanPreviousPage()}
            onClick={handlePreviousPage}
            variant="ghost"
          >
            <span className="sr-only">{t("goToPreviousPage")}</span>
            <ChevronLeft />
          </Button>
          <Button
            className="rounded-none p-0"
            disabled={!table.getCanNextPage()}
            onClick={handleNextPage}
            variant="ghost"
          >
            <span className="sr-only">{t("goToNextPage")}</span>
            <ChevronRight />
          </Button>
          <Button
            className="hidden rounded-none p-0 lg:flex"
            disabled={!table.getCanNextPage()}
            onClick={handleLastPage}
            variant="ghost"
          >
            <span className="sr-only">{t("goToLastPage")}</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
