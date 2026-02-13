"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { User } from "@/lib/modules/users/data";
import { UserActionsMenu } from "./user-actions-menu";

export const useUserColumns = (): ColumnDef<User>[] => {
  const t = useTranslations("Users");

  return [
    {
      accessorKey: "name",
      header: t("table.user"),
      cell: ({ row }) => {
        const user = row.original;
        const initials = user.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2);

        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage alt={user.name} src={user.image || ""} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="truncate font-medium text-sm">{user.name}</span>
              <span className="max-w-50 truncate text-muted-foreground text-xs">
                {user.email}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "username",
      header: t("table.username"),
      cell: ({ row }) => {
        const username = row.getValue("username") as string | null;
        return username ? (
          <span>{username}</span>
        ) : (
          <span className="text-muted-foreground text-xs italic">
            {t("table.noUsername")}
          </span>
        );
      },
    },
    {
      accessorKey: "phone",
      header: t("table.phone"),
      cell: ({ row }) => {
        const phone = row.getValue("phone") as string | null;
        if (!phone) {
          return (
            <span className="text-muted-foreground text-xs italic">-</span>
          );
        }
        return (
          <div className="flex items-center text-muted-foreground text-sm">
            <Phone className="mr-2 h-3 w-3" />
            {phone}
          </div>
        );
      },
    },
    {
      accessorKey: "role",
      header: t("table.role"),
      cell: ({ row }) => {
        const role = row.getValue("role") as string;
        const getVariant = (r: string) => {
          switch (r) {
            case "superadmin":
              return "default";
            case "admin":
              return "secondary";
            default:
              return "outline";
          }
        };
        return (
          <Badge className="capitalize" variant={getVariant(role)}>
            {role}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;
        return <UserActionsMenu user={user} />;
      },
    },
  ];
};
