"use client";

import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import type React from "react";
import { useTableContext } from "@/components/table/context";
import { DataTableSearch } from "@/components/table/data-table-search";
import { DataTableViewOptions } from "@/components/table/data-table-view-options";
import { Button } from "@/components/ui/button";
import { useSearchQuery } from "@/hooks/use-search-query";

type Props = {
  children?: React.ReactNode;
  searchPlaceholder?: string;
};

export function TableToolbar({ children, searchPlaceholder }: Props) {
  const t = useTranslations("Table.search");
  const { table, globalFilter, setGlobalFilter, isManualPagination } =
    useTableContext();
  const { updateSearchQuery } = useSearchQuery();
  const isFiltered =
    table.getState().columnFilters.length > 0 || !!globalFilter;
  const placeholder = searchPlaceholder || t("searchPlaceholder");

  return (
    <div className="flex w-full items-center">
      <DataTableSearch
        className="rounded-none border-none dark:bg-background"
        onChange={setGlobalFilter}
        placeholder={placeholder}
        table={table}
        value={globalFilter}
      />
      {isFiltered && (
        <Button
          className="rounded-none px-2 lg:px-3"
          onClick={() => {
            table.resetColumnFilters();
            setGlobalFilter("");
            table.firstPage();
            if (isManualPagination) {
              updateSearchQuery("");
            }
          }}
          variant="ghost"
        >
          <X />
        </Button>
      )}
      <div className="ml-auto flex max-w-max">
        {children}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
