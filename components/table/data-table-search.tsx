import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useTableContext } from "./context";

type Props = {
  placeholder?: string;
  className?: string;
};

export const DataTableSearch = ({ placeholder, className }: Props) => {
  const t = useTranslations("Table.search");
  const { globalFilter, setGlobalFilter } = useTableContext();
  const searchPlaceholder = placeholder || t("placeholder");

  return (
    <div className="flex w-full items-center gap-2 px-0 md:px-3">
      <Search className="hidden size-5 text-muted-foreground md:block" />
      <Input
        className={cn("bg-background", className)}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder={searchPlaceholder}
        value={globalFilter}
      />
    </div>
  );
};
