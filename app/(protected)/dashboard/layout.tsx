import type { ReactNode } from "react";
import { getSession } from "@/lib/modules/auth/session";

type Props = {
  superadmin: ReactNode;
  admin: ReactNode;
  user: ReactNode;
};

const DashboardLayout = async (props: Props) => {
  const role = (await getSession())?.user.role;

  if (role === "admin") {
    return props.admin;
  }

  if (role === "superadmin") {
    return props.superadmin;
  }

  return props.user;
};

export default DashboardLayout;
