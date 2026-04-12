import { getTranslations } from "next-intl/server";
import { MetricCard } from "@/components/features/dashboard/metric-card";
import { AdminDashboardApi } from "@/lib/modules/admin-dashboard/data";

export default async function OperationalMetricsSlot() {
  const metrics = await AdminDashboardApi.getOperationalMetrics();
  const t = await getTranslations("Dashboard.admin.operationalMetrics");

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
