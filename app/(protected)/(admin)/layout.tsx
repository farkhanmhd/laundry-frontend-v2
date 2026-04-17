import { redirect } from "next/navigation";
import { getCurrentUserData } from "@/lib/modules/auth/session";

type Props = {
  children: React.ReactNode;
};

const AdminLayout = async ({ children }: Props) => {
  const userData = await getCurrentUserData();

  if (userData?.role === "user" || !userData) {
    redirect("/dashboard");
  }

  return children;
};

export default AdminLayout;
