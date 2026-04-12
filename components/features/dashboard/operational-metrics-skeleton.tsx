import { MetricCard } from "@/components/features/dashboard/metric-card";
import { Skeleton } from "@/components/ui/skeleton";

export function OperationalMetricsSkeleton() {
  return (
    <>
      <MetricCard
        description="Waiting for Payment"
        title="Orders Pending"
        valueClassName="text-destructive"
      >
        <Skeleton className="h-10 w-16" />
      </MetricCard>

      <MetricCard
        description="Operations in progress"
        title="In Processing"
        valueClassName="text-primary"
      >
        <Skeleton className="h-10 w-16" />
      </MetricCard>

      <MetricCard
        description="To be collected"
        title="Pickup Requests"
        valueClassName="text-foreground"
      >
        <Skeleton className="h-10 w-16" />
      </MetricCard>

      <MetricCard
        description="Ready to ship"
        title="Delivery Requests"
        valueClassName="text-foreground"
      >
        <Skeleton className="h-10 w-16" />
      </MetricCard>
    </>
  );
}
