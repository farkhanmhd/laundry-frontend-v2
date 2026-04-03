import { format, startOfMonth } from "date-fns";
import { BundlingStatsChart } from "@/components/features/dashboard/bundling-stats-chart";
import { InventoryUsageChart } from "@/components/features/dashboard/inventory-usage-chart";
import { TopServicesChart } from "@/components/features/dashboard/top-service-chart";
import { AdminDashboardApi } from "@/lib/modules/admin-dashboard/data";
import { type DateRangeSearchParams, getDateRange } from "@/lib/utils";

type Props = {
  searchParams: Promise<DateRangeSearchParams>;
};

const PerformanceCharts = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const dateRange = getDateRange({ from: params.from, to: params.to });
  const query = {
    from: format(dateRange.from || startOfMonth(new Date()), "dd-MM-yyyy"),
    to: format(dateRange.to || new Date(), "dd-MM-yyyy"),
  };

  const [topServices, inventoryUsage, bundlingStats] = await Promise.all([
    AdminDashboardApi.getTopServices(query),
    AdminDashboardApi.getInventoryUsage(query),
    AdminDashboardApi.getBundlingStats(query),
  ]);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <TopServicesChart data={topServices ?? []} />
      <InventoryUsageChart data={inventoryUsage ?? []} />
      <BundlingStatsChart data={bundlingStats ?? []} />
    </div>
  );
};

export default PerformanceCharts;
