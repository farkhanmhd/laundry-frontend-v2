import { redirect } from "next/navigation";
import { getSession } from "@/lib/modules/auth/session";

type Props = {
  children: React.ReactNode;
};

const AdminLayout = async ({ children }: Props) => {
  const role = (await getSession())?.user.role;

  if (role === "user") {
    redirect("/dashboard");
  }

  return children;
};

export default AdminLayout;
