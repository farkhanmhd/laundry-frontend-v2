"use client";

import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useTableContext } from "./context";

interface Props {
  placeholder?: string;
  className?: string;
}

export const DataTableQuerySearch = ({ placeholder, className }: Props) => {
  const t = useTranslations("Members.table");
  const { setGlobalFilter, table, globalFilter } = useTableContext();
  const searchPlaceholder = placeholder || t("placeholder");

  const handleSearchChange = (searchQuery: string) => {
    setGlobalFilter(searchQuery);
    table.firstPage();
  };

  return (
    <div className="flex items-center gap-2 px-0">
      <Input
        className={cn("bg-background", className)}
        onChange={(e) => handleSearchChange(e.target.value)}
        placeholder={searchPlaceholder}
        value={globalFilter}
      />
    </div>
  );
};
