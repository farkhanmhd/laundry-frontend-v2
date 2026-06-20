"use client";

import { QueryFacetedFilter } from "@/components/table/query-faceted-filter";
import { userRoles } from "@/lib/modules/users/data";

const memberTypeOptions = userRoles.map((role) => ({
  value: role,
  label: role.charAt(0).toUpperCase() + role.slice(1),
}));

export const UserRoleFilter = () => {
  return (
    <QueryFacetedFilter
      options={memberTypeOptions}
      queryKey="role"
      title="Filter"
    />
  );
};
