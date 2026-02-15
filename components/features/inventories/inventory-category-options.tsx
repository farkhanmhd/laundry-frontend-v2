"use client";

import { Settings } from "lucide-react";
import { useTranslations } from "next-intl";
import { QueryFacetedFilter } from "@/components/table/query-faceted-filter";
import { useInventoryCategoryOptions } from "./columns";

export const InventoryCategoryOptions = () => {
  const t = useTranslations("Inventories");
  const options = useInventoryCategoryOptions();
  return (
    <QueryFacetedFilter
      icon={<Settings className="h-4 w-4" />}
      options={options}
      placeholder={t("logs.searchCategory")}
      queryKey="category"
      title={t("logs.category")}
    />
  );
};
