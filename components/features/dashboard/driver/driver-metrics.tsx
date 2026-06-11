"use client";

import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { MetricCard } from "@/components/features/dashboard/metric-card";
import { Skeleton } from "@/components/ui/skeleton";
import { DriverDashboardApi } from "@/lib/modules/driver-dashboard/data";
import { ErrorSection } from "./error-section";

export function DriverMetrics() {
  const { data, isFetching, isLoading, isError, refetch } = useQuery({
    queryKey: ["driver-dashboard", "metrics"],
    queryFn: () => DriverDashboardApi.getMetrics(),
  });

  const t = useTranslations("driverDashboard.metrics");
  const tError = useTranslations("driverDashboard.error");

  if (isLoading || isFetching) {
    return (
      <>
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </>
    );
  }

  if (isError) {
    return (
      <div className="col-span-full">
        <ErrorSection message={tError("metrics")} onRetry={() => refetch()} />
      </div>
    );
  }

  return (
    <>
      <MetricCard
        description={t("totalRoutes")}
        title={t("totalRoutes")}
        valueClassName="text-primary"
      >
        {data?.totalRoutes ?? 0}
      </MetricCard>

      <MetricCard
        description={t("totalPickups")}
        title={t("totalPickups")}
        valueClassName="text-foreground"
      >
        {data?.totalPickups ?? 0}
      </MetricCard>

      <MetricCard
        description={t("totalDeliveries")}
        title={t("totalDeliveries")}
        valueClassName="text-foreground"
      >
        {data?.totalDeliveries ?? 0}
      </MetricCard>

      <MetricCard
        description={t("inProgress")}
        title={t("inProgress")}
        valueClassName="text-primary"
      >
        {data?.inProgress ?? 0}
      </MetricCard>
    </>
  );
}
