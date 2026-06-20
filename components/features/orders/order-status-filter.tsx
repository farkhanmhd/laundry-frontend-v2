"use client";

import { QueryFacetedFilter } from "@/components/table/query-faceted-filter";
import { orderStatus } from "@/lib/modules/orders/data";

const orderStatusOptions = orderStatus.map((status) => ({
  value: status,
  label: status.charAt(0).toUpperCase() + status.slice(1),
}));

export const OrderStatusFilter = () => {
  return (
    <QueryFacetedFilter
      options={orderStatusOptions}
      queryKey="status"
      title="Status"
    />
  );
};
