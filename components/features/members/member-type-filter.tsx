"use client";

import { QueryFacetedFilter } from "@/components/table/query-faceted-filter";
import { memberType } from "@/lib/modules/member-reports/constants";

const memberTypeOptions = memberType.map((status) => ({
  value: status,
  label: status
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" "),
}));

export const MemberTypeFilter = () => {
  return (
    <QueryFacetedFilter
      className="rounded-lg"
      options={memberTypeOptions}
      queryKey="type"
      title="Filter"
      variant="outline"
    />
  );
};
