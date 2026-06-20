"use client";

import { QueryFacetedFilter } from "@/components/table/query-faceted-filter";
import { deliveryStatus } from "@/lib/modules/deliveries/data";

const deliveryStatusOptions = deliveryStatus.map((status) => ({
  value: status,
  label: status
    .split("_")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" "),
}));

export const DeliveryStatusFilter = () => {
  return (
    <QueryFacetedFilter
      options={deliveryStatusOptions}
      queryKey="status"
      title="Status"
    />
  );
};
