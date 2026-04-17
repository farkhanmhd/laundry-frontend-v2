import { AdminDashboard } from "@/components/features/dashboard/admin-dashboard";
import { SuperAdminDashboard } from "@/components/features/dashboard/superadmin-dashboard";
import { UserDashboard } from "@/components/features/dashboard/user-dashboard";
import { getCurrentUserData } from "@/lib/modules/auth/session";
import type { DateRangeSearchParams } from "@/lib/utils";

type Props = {
  searchParams: Promise<DateRangeSearchParams>;
};

const DashboardPage = async (props: Props) => {
  const userData = await getCurrentUserData();
  const searchParams = await props.searchParams;

  if (!userData) {
    return null;
  }

  if (userData.role === "admin") {
    return <AdminDashboard />;
  }

  if (userData.role === "superadmin") {
    return <SuperAdminDashboard searchParams={searchParams} />;
  }

  if (userData.role === "user") {
    return <UserDashboard />;
  }
};

export default DashboardPage;
