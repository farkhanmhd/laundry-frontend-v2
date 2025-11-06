"use client";

import React from "react";
import { X } from "lucide-react";
import { DataTableSearch } from "@/components/table/data-table-search";
import { DataTableViewOptions } from "@/components/table/data-table-view-options";
import { Button, buttonVariants } from "@/components/ui/button";
import { useTableContext } from "@/components/table/context";

type Props = {
  children: React.ReactNode;
  searchPlaceholder?: string;
};

export function TableToolbar({ children, searchPlaceholder = "Search..." }: Props) {
  const { table, globalFilter, setGlobalFilter } = useTableContext();
  const isFiltered = table.getState().columnFilters.length > 0 || !!globalFilter;

  return (
    <div className='flex w-full items-center'>
      <DataTableSearch className='rounded-none border-none dark:bg-background' onChange={setGlobalFilter} placeholder={searchPlaceholder} table={table} value={globalFilter} />
      {isFiltered && (
        <Button
          className='rounded-none border-r-muted-foreground/60 px-2 lg:px-3 dark:border-r-muted'
          onClick={() => {
            table.resetColumnFilters();
            setGlobalFilter("");
          }}
          variant='ghost'
        >
          <X />
        </Button>
      )}
      <div className='ml-auto flex max-w-max'>
        <DataTableViewOptions table={table} />
        {children}
      </div>
    </div>
  );
}
