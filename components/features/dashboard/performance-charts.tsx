"use client";

import { useQuery } from "@tanstack/react-query";
import { format, startOfMonth } from "date-fns";
import { BundlingStatsChart } from "@/components/features/dashboard/bundling-stats-chart";
import { InventoryUsageChart } from "@/components/features/dashboard/inventory-usage-chart";
import { TopServicesChart } from "@/components/features/dashboard/top-service-chart";
import { AdminDashboardApi } from "@/lib/modules/admin-dashboard/data";
import { type DateRangeSearchParams, getDateRange } from "@/lib/utils";
import { PerformanceChartsError } from "./performance-charts-error";
import { PerformanceChartsSkeleton } from "./performance-charts-skeleton";

export function PerformanceCharts({
  searchParams,
}: {
  searchParams: DateRangeSearchParams;
}) {
  const dateRange = getDateRange(searchParams);
  const queryParams = {
    from: format(dateRange.from || startOfMonth(new Date()), "dd-MM-yyyy"),
    to: format(dateRange.to || new Date(), "dd-MM-yyyy"),
  };

  const topServicesQuery = useQuery({
    queryKey: ["topServices", queryParams.from, queryParams.to],
    queryFn: () => AdminDashboardApi.getTopServices(queryParams),
  });

  const inventoryUsageQuery = useQuery({
    queryKey: ["inventoryUsage", queryParams.from, queryParams.to],
    queryFn: () => AdminDashboardApi.getInventoryUsage(queryParams),
  });

  const bundlingStatsQuery = useQuery({
    queryKey: ["bundlingStats", queryParams.from, queryParams.to],
    queryFn: () => AdminDashboardApi.getBundlingStats(queryParams),
  });

  const isLoading =
    topServicesQuery.isLoading ||
    inventoryUsageQuery.isLoading ||
    bundlingStatsQuery.isLoading;

  const isFetching =
    topServicesQuery.isFetching ||
    inventoryUsageQuery.isFetching ||
    bundlingStatsQuery.isFetching;

  const isError =
    topServicesQuery.isError ||
    inventoryUsageQuery.isError ||
    bundlingStatsQuery.isError;

  const refetchAll = async () => {
    await Promise.all([
      topServicesQuery.refetch(),
      inventoryUsageQuery.refetch(),
      bundlingStatsQuery.refetch(),
    ]);
  };

  if (isLoading || isFetching) {
    return <PerformanceChartsSkeleton />;
  }

  if (isError) {
    return <PerformanceChartsError resetErrorBoundary={refetchAll} />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <TopServicesChart data={topServicesQuery.data ?? []} />
      <InventoryUsageChart data={inventoryUsageQuery.data ?? []} />
      <BundlingStatsChart data={bundlingStatsQuery.data ?? []} />
    </div>
  );
}
