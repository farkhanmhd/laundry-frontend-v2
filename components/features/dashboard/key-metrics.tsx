"use client";

import { useQuery } from "@tanstack/react-query";
import { format, startOfMonth } from "date-fns";
import { useTranslations } from "next-intl";
import { StatCard } from "@/components/features/dashboard/stat-card";
import { AdminDashboardApi } from "@/lib/modules/admin-dashboard/data";
import {
  type DateRangeSearchParams,
  formatToIDR,
  getDateRange,
} from "@/lib/utils";
import { KeyMetricsError } from "./key-metrics-error";
import { KeyMetricsSkeleton } from "./key-metrics-skeleton";

export function KeyMetrics({
  searchParams,
}: {
  searchParams: DateRangeSearchParams;
}) {
  const t = useTranslations("Dashboard.superadmin.keyMetrics");

  const dateRange = getDateRange(searchParams);
  const query = {
    from: format(dateRange.from || startOfMonth(new Date()), "dd-MM-yyyy"),
    to: format(dateRange.to || new Date(), "dd-MM-yyyy"),
  };

  const {
    data: metrics,
    isLoading,
    isFetching,
    isError,
    refetch,
    error,
  } = useQuery({
    queryKey: ["keyMetrics", query.from, query.to],
    queryFn: () => AdminDashboardApi.getMetrics(query.from, query.to),
  });

  if (isLoading || isFetching) {
    return <KeyMetricsSkeleton />;
  }

  if (isError) {
    return (
      <KeyMetricsError error={error as Error} resetErrorBoundary={refetch} />
    );
  }

  if (!metrics) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatCard
        label={t("totalRevenue")}
        value={formatToIDR(metrics.totalRevenue)}
        valueColor="text-primary"
      />
      <StatCard label={t("totalOrders")} value={metrics.totalOrders} />
      <StatCard
        label={t("activeMembers")}
        subtext={t("activeMembersSubtext")}
        value={metrics.activeMembers}
      />
      <StatCard
        label={t("staffMembers")}
        subtext={t("staffMembersSubtext")}
        value={metrics.totalStaff}
      />
    </div>
  );
}
