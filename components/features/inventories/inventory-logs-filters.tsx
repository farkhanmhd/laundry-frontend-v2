"use client";

import { Archive, Settings } from "lucide-react";
import { QueryFacetedFilter } from "@/components/table/query-faceted-filter";
import { useInventoryCategoryOptions } from "./columns";

interface Props {
  inventoryOptions: { label: string; value: string }[];
  t: {
    searchByProduct: string;
    searchProduct: string;
    searchCategory: string;
    product: string;
    category: string;
  };
}

export const InventoryLogsFilters = ({ inventoryOptions, t }: Props) => {
  const categoryOptions = useInventoryCategoryOptions();

  return (
    <>
      <QueryFacetedFilter
        icon={<Archive className="h-4 w-4" />}
        options={inventoryOptions}
        placeholder={t.searchProduct}
        queryKey="inventoryIds"
        title={t.product}
      />
      <QueryFacetedFilter
        icon={<Settings className="h-4 w-4" />}
        options={categoryOptions}
        placeholder={t.searchCategory}
        queryKey="category"
        title={t.category}
      />
    </>
  );
};
