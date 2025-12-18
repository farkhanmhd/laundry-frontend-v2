import type { ReactNode } from "react";
import { getSession } from "@/lib/modules/auth/session";

type Props = {
  superadmin: ReactNode;
  admin: ReactNode;
  user: ReactNode;
};

const DashboardLayout = async (props: Props) => {
  const role = (await getSession())?.user.role;

  return props[role as keyof typeof props];
};

export default DashboardLayout;
