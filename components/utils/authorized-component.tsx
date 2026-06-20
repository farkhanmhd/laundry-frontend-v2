"use client";

import { type UserRole, useUserData } from "@/hooks/use-user-data";

type Props = {
  children: React.ReactNode;
  requiredRole: UserRole;
};

export const AuthorizedComponent = ({ children, requiredRole }: Props) => {
  const sessionRole = useUserData();

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
