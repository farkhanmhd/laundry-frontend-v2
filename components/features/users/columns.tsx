"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Phone } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { User } from "@/lib/modules/users/data";
import { UpdateUserRoleDialog } from "./update-user-role-dialog";

export const userColumns: ColumnDef<User>[] = [
  // 2. User Info (Avatar + Name + Email)
  {
    accessorKey: "name",
    header: "User",
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
            <span className="max-w-[200px] truncate text-muted-foreground text-xs">
              {user.email}
            </span>
          </div>
        </div>
      );
    },
  },

  // 3. Username
  {
    accessorKey: "username",
    header: "Username",
    cell: ({ row }) => {
      const username = row.getValue("username") as string | null;
      return username ? (
        <span>{username}</span>
      ) : (
        <span className="text-muted-foreground text-xs italic">
          No username
        </span>
      );
    },
  },

  // 4. Phone (New Column)
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      const phone = row.getValue("phone") as string | null;

      if (!phone) {
        return <span className="text-muted-foreground text-xs italic">-</span>;
      }

      return (
        <div className="flex items-center text-muted-foreground text-sm">
          <Phone className="mr-2 h-3 w-3" />
          {phone}
        </div>
      );
    },
  },

  // 5. Role
  {
    accessorKey: "role",
    header: "Role",
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

  // 6. Actions
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return <UpdateUserRoleDialog user={user} />;
    },
  },
];
