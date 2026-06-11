import { redirect } from "next/navigation";
import { getCurrentUserData } from "@/lib/modules/auth/session";

type Props = {
  children: React.ReactNode;
};

const RoutesLayout = async ({ children }: Props) => {
  const userData = await getCurrentUserData();

  if (!userData || (userData.role !== "superadmin" && userData.role !== "driver")) {
    redirect("/dashboard");
  }

  return children;
};

export default RoutesLayout;
