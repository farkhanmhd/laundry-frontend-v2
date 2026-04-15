import { redirect } from "next/navigation";
import { getSession } from "@/lib/modules/auth/session";

type Props = {
  children: React.ReactNode;
};

const SuperAdminLayout = async ({ children }: Props) => {
  const role = (await getSession())?.user.role;

  if (role !== "superadmin") {
    redirect("/dashboard");
  }

  return children;
};

export default SuperAdminLayout;
