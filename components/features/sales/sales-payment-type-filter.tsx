import { Banknote } from "lucide-react";
import { QueryFacetedFilter } from "@/components/table/query-faceted-filter";
import { Button } from "@/components/ui/button";
import { cardShadowStyle, type SelectOption } from "@/lib/utils";

const itemTypeOptions: SelectOption[] = [
  {
    label: "Cash",
    value: "cash",
  },
  {
    label: "QRIS",
    value: "qris",
  },
];

export const SalesPaymentTypeFilter = () => {
  return (
    <QueryFacetedFilter
      options={itemTypeOptions}
      queryKey="payment_type"
      title="Type"
    >
      <Button style={cardShadowStyle} variant="outline">
        <Banknote />
        Payment
      </Button>
    </QueryFacetedFilter>
  );
};
