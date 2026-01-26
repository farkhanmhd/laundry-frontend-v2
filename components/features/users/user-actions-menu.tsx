"use client";

import {
  Eye,
  MoreHorizontal,
  Shield,
  ShieldAlert,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { User } from "@/lib/modules/users/data";
import { useUserTableDialog } from "./state";

export function UserActionsMenu({ user }: { user: User }) {
  const isAdmin = user.role === "admin";
  const { openUpdateRoleDialog } = useUserTableDialog();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-8 w-8 p-0" variant="ghost">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(user.id)}
        >
          Copy User ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link
            className="flex cursor-pointer items-center"
            href={`/users/${user.id}`}
          >
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className={isAdmin ? "" : "text-primary"}
          onClick={() =>
            openUpdateRoleDialog({
              id: user.id,
              name: user.name,
              role: user.role,
            })
          }
          onSelect={(e) => e.preventDefault()}
        >
          {isAdmin ? (
            <>
              <UserIcon className="mr-2 h-4 w-4" />
              Set as User
            </>
          ) : (
            <>
              <Shield className="mr-2 h-4 w-4" />
              Set as Admin
            </>
          )}
        </DropdownMenuItem>

        <DropdownMenuItem className="text-destructive focus:text-destructive">
          <ShieldAlert className="mr-2 h-4 w-4" />
          Ban User
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
