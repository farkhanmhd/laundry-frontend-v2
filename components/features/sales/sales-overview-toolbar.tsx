import { SalesItemFilter } from "./sales-item-filter";
import { SalesItemTypeFilter } from "./sales-item-type-filter";

export const SalesOverviewToolbar = () => {
  return (
    <>
      <SalesItemTypeFilter />
      <SalesItemFilter />
    </>
  );
};
