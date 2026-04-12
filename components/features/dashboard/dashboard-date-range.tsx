import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardDateRangeContent } from "./dashboard-date-range-content";

export function DashboardDateRangeSkeleton() {
  return <Skeleton className="h-9 w-full md:w-75" />;
}

export function DashboardDateRange() {
  return (
    <Suspense fallback={<DashboardDateRangeSkeleton />}>
      <DashboardDateRangeContent />
    </Suspense>
  );
}
