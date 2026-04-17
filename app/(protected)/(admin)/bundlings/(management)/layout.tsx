import { redirect } from "next/navigation";
import { getCurrentUserData } from "@/lib/modules/auth/session";

type Props = {
  children: React.ReactNode;
};

const SuperAdminLayout = async ({ children }: Props) => {
  const userData = await getCurrentUserData();

  if (!userData) {
    return null;
  }

  if (userData.role !== "superadmin") {
    redirect("/dashboard");
  }

  return children;
};

export default SuperAdminLayout;
