import { FilterSkeleton } from "@/components/features/sales/filter-skeleton";

const OverviewToolbarLoading = () => {
  return (
    <div className="flex gap-3">
      <FilterSkeleton />
      <FilterSkeleton />
    </div>
  );
};

export default OverviewToolbarLoading;
