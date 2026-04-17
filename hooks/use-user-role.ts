import { clientgetCurrentUserData } from "@/lib/modules/auth/utils";
import { useQuery } from "@tanstack/react-query";

export type UserRole = "user" | "admin" | "superadmin";

export const useUserRole = () => {
  const { data: sessionRole } = useQuery({
    queryFn: clientgetCurrentUserData,
    queryKey: ["user-role"],
  });

  return sessionRole as UserRole | undefined | null;
};
