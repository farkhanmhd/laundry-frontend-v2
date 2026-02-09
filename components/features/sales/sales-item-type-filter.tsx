import { Blocks } from "lucide-react";
import { QueryFacetedFilter } from "@/components/table/query-faceted-filter";
import { Button } from "@/components/ui/button";
import { cardShadowStyle, type SelectOption } from "@/lib/utils";

const itemTypeOptions: SelectOption[] = [
  {
    label: "Bundling",
    value: "bundling",
  },
  {
    label: "Inventory",
    value: "inventory",
  },
  {
    label: "Service",
    value: "service",
  },
];

export const SalesItemTypeFilter = () => {
  return (
    <QueryFacetedFilter
      options={itemTypeOptions}
      queryKey="item_type"
      title="Type"
    >
      <Button style={cardShadowStyle} variant="outline">
        <Blocks />
        Type
      </Button>
    </QueryFacetedFilter>
  );
};
