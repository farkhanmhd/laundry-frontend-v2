"use client";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import type { Table } from "@tanstack/react-table";
import { Settings2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  const t = useTranslations("Table.viewOptions");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex rounded-none border-l" variant="ghost">
          <Settings2 />
          <span className="hidden md:block">{t("view")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-37.5">
        <DropdownMenuLabel>{t("toggleColumns")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide()
          )
          .map((column) => (
            <DropdownMenuCheckboxItem
              checked={column.getIsVisible()}
              className="capitalize"
              key={column.id}
              onCheckedChange={(value) => column.toggleVisibility(!!value)}
            >
              {column.id}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
