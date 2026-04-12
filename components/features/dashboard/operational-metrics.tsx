"use client";

import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { MetricCard } from "@/components/features/dashboard/metric-card";
import { AdminDashboardApi } from "@/lib/modules/admin-dashboard/data";
import { OperationalMetricsError } from "./operational-metrics-error";
import { OperationalMetricsSkeleton } from "./operational-metrics-skeleton";

export function OperationalMetrics() {
  const {
    data: metrics,
    isFetching,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["operationalMetrics"],
    queryFn: AdminDashboardApi.getOperationalMetrics,
  });

  const t = useTranslations("Dashboard.admin.operationalMetrics");

  if (isLoading || isFetching) {
    return <OperationalMetricsSkeleton />;
  }

  if (isError) {
    return <OperationalMetricsError resetErrorBoundary={refetch} />;
  }

  if (!metrics) {
    return null;
  }

  return (
    <>
      <MetricCard
        description={t("ordersPendingDesc")}
        title={t("ordersPending")}
        valueClassName="text-destructive"
      >
        {metrics.ordersPending}
      </MetricCard>

      <MetricCard
        description={t("ordersProcessingDesc")}
        title={t("ordersProcessing")}
        valueClassName="text-primary"
      >
        {metrics.ordersProcessing}
      </MetricCard>

      <MetricCard
        description={t("pickupsPendingDesc")}
        title={t("pickupsPending")}
        valueClassName="text-foreground"
      >
        {metrics.pickupsPending}
      </MetricCard>

      <MetricCard
        description={t("deliveriesPendingDesc")}
        title={t("deliveriesPending")}
        valueClassName="text-foreground"
      >
        {metrics.deliveriesPending}
      </MetricCard>
    </>
  );
}
