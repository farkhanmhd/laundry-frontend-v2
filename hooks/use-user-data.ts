import { clientgetCurrentUserData } from "@/lib/modules/auth/utils";
import { useQuery } from "@tanstack/react-query";

export type UserRole = "user" | "admin" | "superadmin";

export const useUserData = () => {
  const { data } = useQuery({
    queryFn: clientgetCurrentUserData,
    queryKey: ["user-role"],
  });

  return data;
};
