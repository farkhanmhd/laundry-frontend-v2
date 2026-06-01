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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authClient } from "@/lib/modules/auth/auth-client";
import { queryClient } from "@/lib/query-client";
import { useUserTableDialog } from "./state";

const ALL_ROLES = ["superadmin", "admin", "driver", "user"] as const;

export function UpdaterequiredRoleDialog() {
  const t = useTranslations("Users.roleDialog");
  const { isRoleDialogOpen, user, closeUserDialog } = useUserTableDialog();
  const [selectedRole, setSelectedRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const availableRoles = user?.role
    ? ALL_ROLES.filter((role) => role !== user.role)
    : [];

  const handleUpdateRole = async () => {
    if (!selectedRole) {
      return;
    }
    setIsLoading(true);

    try {
      const { error } = await authClient.admin.setRole({
        userId: user?.id as string,
        role: selectedRole as "admin" | "user",
      });

      if (error) {
        toast.error(t("failedUpdate"));
        setIsLoading(false);
        return;
      }

      toast.success(
        t("successMessage", {
          name: user?.name ?? "",
          role: t(`roles.${selectedRole}`),
        })
      );

      queryClient.invalidateQueries();
      closeUserDialog();
      setSelectedRole("");
    } catch {
      toast.error(t("unexpectedError"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeUserDialog();
      setSelectedRole("");
    }
  };

  return (
    <AlertDialog onOpenChange={handleOpenChange} open={isRoleDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("title")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("description", { name: user?.name ?? "" })}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="py-4">
          <Select
            disabled={isLoading}
            onValueChange={setSelectedRole}
            value={selectedRole}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t("placeholder")} />
            </SelectTrigger>
            <SelectContent>
              {availableRoles.map((role) => (
                <SelectItem key={role} value={role}>
                  {t(`roles.${role}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>
            {t("cancel")}
          </AlertDialogCancel>
          <Button
            disabled={isLoading || !selectedRole}
            onClick={handleUpdateRole}
          >
            {t("updateRole")}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
