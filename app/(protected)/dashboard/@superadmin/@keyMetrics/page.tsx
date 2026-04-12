import { randomUUID } from "node:crypto";
import { format, startOfMonth } from "date-fns";
import { getTranslations } from "next-intl/server";
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
  const t = await getTranslations("Dashboard.superadmin.keyMetrics");

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4" key={randomUUID()}>
      <StatCard
        label={t("totalRevenue")}
        value={metrics.totalRevenue}
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
};

export default KeyMetricSlot;
