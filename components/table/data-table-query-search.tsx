"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useTableContext } from "./context";

interface Props {
  placeholder?: string;
  className?: string;
}

export const DataTableQuerySearch = ({
  placeholder = "Search",
  className,
}: Props) => {
  const { setGlobalFilter, table, globalFilter } = useTableContext();

  const handleSearchChange = (searchQuery: string) => {
    setGlobalFilter(searchQuery);
    table.firstPage();
  };

  return (
    <div className="flex items-center gap-2 px-0">
      <Input
        className={cn("bg-background", className)}
        onChange={(e) => handleSearchChange(e.target.value)}
        placeholder={placeholder}
        value={globalFilter}
      />
    </div>
  );
};
