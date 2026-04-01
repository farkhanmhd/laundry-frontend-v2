import { format, startOfMonth } from "date-fns";
import { StatCard } from "@/components/features/dashboard/stat-card";
import { AdminDashboardApi } from "@/lib/modules/admin-dashboard/data";
import { type DateRangeSearchParams, getDateRange } from "@/lib/utils";

type Props = {
  searchParams: Promise<DateRangeSearchParams>;
};

const KeyMetricSlot = async (props: Props) => {
  const params = await props.searchParams;
  const dateRange = getDateRange({
    from: params.from,
    to: params.to,
  });
  const query = {
    from: format(dateRange.from || startOfMonth(new Date()), "dd-MM-yyyy"),
    to: format(dateRange.to || new Date(), "dd-MM-yyyy"),
  };
  const metrics = await AdminDashboardApi.getMetrics(query.from, query.to);

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatCard
        label="Total Revenue"
        value={metrics.totalRevenue}
        valueColor="text-primary"
      />
      <StatCard label="Total Orders" value={metrics.totalOrders} />
      <StatCard
        label="Active Members"
        subtext="Registered loyalty members"
        value={metrics.activeMembers}
      />
      <StatCard
        label="Staff Members"
        subtext="Across all branches"
        value={metrics.totalStaff}
      />
    </div>
  );
};

export default KeyMetricSlot;
