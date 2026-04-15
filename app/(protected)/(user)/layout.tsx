import { redirect } from "next/navigation";
import { authClient } from "@/lib/modules/auth/auth-client";

type Props = {
  children: React.ReactNode;
};

const UserLayout = async ({ children }: Props) => {
  const { data } = await authClient.getSession();

  const role = data?.user.role;

  if (role !== "user") {
    redirect("/dashboard");
  }

  return children;
};

export default UserLayout;
