import { AdminDashboard } from "@/components/features/dashboard/admin-dashboard";
import { SuperAdminDashboard } from "@/components/features/dashboard/superadmin-dashboard";
import { UserDashboard } from "@/components/features/dashboard/user-dashboard";
import { getSession } from "@/lib/modules/auth/session";
import type { DateRangeSearchParams } from "@/lib/utils";

type Props = {
  searchParams: Promise<DateRangeSearchParams>;
};

const DashboardPage = async (props: Props) => {
  const role = (await getSession())?.user.role;
  const searchParams = await props.searchParams;

  if (!role) {
    return null;
  }

  if (role === "admin") {
    return <AdminDashboard />;
  }

  if (role === "superadmin") {
    return <SuperAdminDashboard searchParams={searchParams} />;
  }

  if (role === "user") {
    return <UserDashboard />;
  }
};

export default DashboardPage;
