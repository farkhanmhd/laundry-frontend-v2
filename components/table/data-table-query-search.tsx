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
  const t = useTranslations("Table");
  const { setGlobalFilter, globalFilter } = useTableContext();
  const searchPlaceholder = placeholder || t("search.placeholder");

  return (
    <div className="flex items-center gap-2 px-0">
      <Input
        className={cn("bg-background", className)}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder={searchPlaceholder}
        value={globalFilter}
      />
    </div>
  );
};
