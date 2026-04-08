import type { ReactNode } from "react";
import { getSession } from "@/lib/modules/auth/session";

type Props = {
  user: ReactNode;
  admins: ReactNode;
};

const DashboardLayout = async (props: Props) => {
  const role = (await getSession())?.user.role;

  return props[(role === "user" ? "user" : "admins") as keyof typeof props];
};

export default DashboardLayout;
