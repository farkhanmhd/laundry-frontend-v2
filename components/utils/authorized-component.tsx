"use client";

import { type UserRole, useUserRole } from "@/hooks/use-user-role";

type Props = {
  children: React.ReactNode;
  requiredRole: UserRole;
};

export const AuthorizedComponent = ({ children, requiredRole }: Props) => {
  const sessionRole = useUserRole();

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
