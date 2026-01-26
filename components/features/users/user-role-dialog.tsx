"use client";

import { useRouter } from "next/navigation";
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
import { useUserTableDialog } from "./state";

export function UpdateUserRoleDialog() {
  const { isRoleDialogOpen, isUserAdmin, user, closeUserDialog } =
    useUserTableDialog();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleUpdateRole = async () => {
    setIsLoading(true);

    try {
      const { error } = await authClient.admin.setRole({
        userId: user?.id as string,
        role: isUserAdmin ? "user" : "admin",
      });

      if (error) {
        toast.error("Failed to update role");
        setIsLoading(false);
      }

      toast.success(
        `User ${isUserAdmin ? "demoted to User" : "promoted to Admin"}`
      );

      router.refresh();
      closeUserDialog();
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <AlertDialog onOpenChange={closeUserDialog} open={isRoleDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isUserAdmin ? "Revoke admin access?" : "Grant admin access?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isUserAdmin
              ? `Are you sure you want to demote ${user?.name}? They will lose dashboard access.`
              : `Are you sure you want to promote ${user?.name}? They will have full administrative privileges.`}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>

          <Button
            disabled={isLoading}
            onClick={handleUpdateRole}
            variant={isUserAdmin ? "destructive" : "default"}
          >
            {isUserAdmin ? "Revoke Access" : "Confirm Admin"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
