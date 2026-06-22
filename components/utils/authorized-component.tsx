"use client";

import { type UserRole, useUserData } from "@/hooks/use-user-data";

type Props = {
  children: React.ReactNode;
  requiredRole: UserRole;
};

export const AuthorizedComponent = ({ children, requiredRole }: Props) => {
  const userData = useUserData();

  if (!userData) {
    return null;
  }

  const isAuthorized =
    userData.role === requiredRole ||
    (userData.role === "superadmin" && requiredRole === "admin");

  if (!isAuthorized) {
    return null;
  }

  return children;
};
