"use client";

import { Settings } from "lucide-react";
import { QueryFacetedFilter } from "@/components/table/query-faceted-filter";
import { useInventoryCategoryOptions } from "./columns";

export const InventoryCategoryOptions = () => {
  const options = useInventoryCategoryOptions();
  return (
    <QueryFacetedFilter
      icon={<Settings className="h-4 w-4" />}
      options={options}
      placeholder="Search Category"
      queryKey="category"
      title="Category"
    />
  );
};
