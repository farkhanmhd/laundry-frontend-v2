import { Archive } from "lucide-react";
import { QueryFacetedFilter } from "@/components/table/query-faceted-filter";
import { Button } from "@/components/ui/button";
import { SalesApi } from "@/lib/modules/sales/data";
import { cardShadowStyle } from "@/lib/utils";

export const SalesItemFilter = async () => {
  const itemOptions = await SalesApi.getItemOptions();
  return (
    <QueryFacetedFilter options={itemOptions} queryKey="item_id" title="Item">
      <Button style={cardShadowStyle} variant="outline">
        <Archive />
        Item
      </Button>
    </QueryFacetedFilter>
  );
};
