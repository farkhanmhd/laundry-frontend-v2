import type { Table } from "@tanstack/react-table";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSearchQuery } from "@/hooks/use-search-query";
import { cn } from "@/lib/utils";
import { useTableContext } from "./context";

type Props<TData> = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  table: Table<TData>;
  className?: string;
};

export const DataTableSearch = <TData,>({
  value,
  onChange,
  placeholder = "Search all columns...",
  table,
  className,
}: Props<TData>) => {
  const { updateSearchQuery } = useSearchQuery();
  const { setGlobalFilter, isManualPagination } = useTableContext();

  const handleTableSearchChange = (searchQuery: string) => {
    if (isManualPagination) {
      setGlobalFilter(searchQuery);
      updateSearchQuery(searchQuery);
    } else {
      onChange(searchQuery);
    }
    table.firstPage();
  };
  return (
    <div className="flex w-full items-center gap-2 px-0 md:px-3">
      <Search className="hidden size-5 text-muted-foreground md:block" />
      <Input
        className={cn("bg-background", className)}
        onChange={(e) => handleTableSearchChange(e.target.value)}
        placeholder={placeholder}
        value={value ?? ""}
      />
    </div>
  );
};
