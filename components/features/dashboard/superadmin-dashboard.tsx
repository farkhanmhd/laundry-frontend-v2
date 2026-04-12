import { getTranslations } from "next-intl/server";
import { DashboardDateRange } from "@/components/features/dashboard/dashboard-date-range";
import { LowStock } from "@/components/features/dashboard/low-stock";
import { OrderStatus } from "@/components/features/dashboard/order-status";
import { SuperAdminRecentOrders } from "@/components/features/dashboard/superadmin-recent-orders";
import type { DateRangeSearchParams } from "@/lib/utils";
import { KeyMetrics } from "./key-metrics";
import { PerformanceCharts } from "./performance-charts";

export async function SuperAdminDashboard({
  searchParams,
}: {
  searchParams: DateRangeSearchParams;
}) {
  const t = await getTranslations("Dashboard.superadmin");
  return (
    <div className="p-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="font-bold text-3xl">{t("title")}</h1>
            <p className="mt-1 text-muted-foreground">{t("subtitle")}</p>
          </div>

          <DashboardDateRange />
        </div>

        <KeyMetrics searchParams={searchParams} />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <OrderStatus searchParams={searchParams} />
          <LowStock />
        </div>
        <PerformanceCharts searchParams={searchParams} />
        <SuperAdminRecentOrders />
      </div>
    </div>
  );
}
