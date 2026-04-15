"use client";

import { authClient } from "@/lib/modules/auth/auth-client";

type Props = {
  children: React.ReactNode;
  requiredRole: "user" | "admin" | "superadmin";
};

export const AuthorizedComponent = ({ children, requiredRole }: Props) => {
  const sessionRole = authClient.useSession()?.data?.user.role;

  if (!sessionRole) {
    return null;
  }

  const isAuthorized =
    sessionRole === requiredRole ||
    (sessionRole === "superadmin" && requiredRole === "admin");

  if (!isAuthorized) {
    return null;
  }

  return children;
};
