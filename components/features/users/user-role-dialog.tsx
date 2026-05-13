"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/modules/auth/auth-client";
import { queryClient } from "@/lib/query-client";
import { useUserTableDialog } from "./state";

export function UpdaterequiredRoleDialog() {
  const t = useTranslations("Users.roleDialog");
  const { isRoleDialogOpen, isUserAdmin, user, closeUserDialog } =
    useUserTableDialog();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateRole = async () => {
    setIsLoading(true);

    try {
      const { error } = await authClient.admin.setRole({
        userId: user?.id as string,
        role: isUserAdmin ? "user" : "admin",
      });

      if (error) {
        toast.error(t("failedUpdate"));
        setIsLoading(false);
        return;
      }

      toast.success(
        t(isUserAdmin ? "demotedToUser" : "promotedToAdmin", {
          name: user?.name ?? "",
        })
      );

      queryClient.invalidateQueries();
      closeUserDialog();
    } catch {
      toast.error(t("unexpectedError"));
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <AlertDialog onOpenChange={closeUserDialog} open={isRoleDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isUserAdmin ? t("revokeAdminTitle") : t("grantAdminTitle")}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isUserAdmin
              ? t("revokeDescription", { name: user?.name ?? "" })
              : t("grantDescription", { name: user?.name ?? "" })}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>
            {t("cancel")}
          </AlertDialogCancel>

          <Button
            disabled={isLoading}
            onClick={handleUpdateRole}
            variant={isUserAdmin ? "destructive" : "default"}
          >
            {isUserAdmin ? t("revokeAccess") : t("confirmAdmin")}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
