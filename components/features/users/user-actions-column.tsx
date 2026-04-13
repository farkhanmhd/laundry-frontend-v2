"use client";

import { UserKey, UserX } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import type { User } from "@/lib/modules/users/data";
import { useUserTableDialog } from "./state";

export function UserActionsColumn({ user }: { user: User }) {
  const t = useTranslations("Users.actions");
  const isAdmin = user.role === "admin";
  const { openUpdateRoleDialog } = useUserTableDialog();

  return (
    <Button
      aria-label={t("buttonLabel")}
      onClick={() =>
        openUpdateRoleDialog({
          id: user.id,
          name: user.name,
          role: user.role,
        })
      }
      size="icon"
      variant={isAdmin ? "destructive" : "secondary"}
    >
      {isAdmin ? (
        <UserX className="h-4 w-4" />
      ) : (
        <UserKey className="h-4 w-4" />
      )}
    </Button>
  );
}
