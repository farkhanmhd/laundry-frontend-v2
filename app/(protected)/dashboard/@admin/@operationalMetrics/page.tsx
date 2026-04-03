import { MetricCard } from "@/components/features/dashboard/metric-card";
import { AdminDashboardApi } from "@/lib/modules/admin-dashboard/data";

export default async function OperationalMetricsSlot() {
  const metrics = await AdminDashboardApi.getOperationalMetrics();

  return (
    <>
      <MetricCard
        description="Waiting for Payment"
        title="Orders Pending"
        valueClassName="text-destructive"
      >
        {metrics.ordersPending}
      </MetricCard>

      <MetricCard
        description="Operations in progress"
        title="In Processing"
        valueClassName="text-primary"
      >
        {metrics.ordersProcessing}
      </MetricCard>

      <MetricCard
        description="To be collected"
        title="Pickup Requests"
        valueClassName="text-foreground"
      >
        {metrics.pickupsPending}
      </MetricCard>

      <MetricCard
        description="Ready to ship"
        title="Delivery Requests"
        valueClassName="text-foreground"
      >
        {metrics.deliveriesPending}
      </MetricCard>
    </>
  );
}
