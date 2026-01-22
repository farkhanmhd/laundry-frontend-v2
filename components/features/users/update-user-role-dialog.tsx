"use client";

import {
  Eye,
  MoreHorizontal,
  Shield,
  ShieldAlert,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react"; // 1. Import useState
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction, // 3. Use Action for semantic correctness
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/modules/auth/auth-client";
import type { User } from "@/lib/modules/users/data";

export function UpdateUserRoleDialog({ user }: { user: User }) {
  const [open, setOpen] = useState(false); // Control dialog state
  const [isLoading, setIsLoading] = useState(false); // Control loading state
  const router = useRouter();

  const isAdmin = user.role === "admin";

  const handleUpdateRole = async (e: React.MouseEvent) => {
    // Prevent the dialog from closing immediately
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await authClient.admin.setRole({
        userId: user.id,
        role: isAdmin ? "user" : "admin",
      });

      if (error) {
        // Log the actual error message to the toast
        console.error("Role Update Error:", error);
        toast.error(error.message || "Failed to update role");
        setIsLoading(false);
        return; // Keep dialog open on error
      }

      toast.success(
        `User ${isAdmin ? "demoted to User" : "promoted to Admin"}`
      );

      router.refresh(); // Update the UI data
      setOpen(false); // Close dialog on success
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
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

          {/* Trigger the AlertDialog */}
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              // Prevent dropdown from handling the click so the dialog trigger works smoothly
              className={isAdmin ? "" : "text-primary"}
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
          </AlertDialogTrigger>

          <DropdownMenuItem className="text-destructive focus:text-destructive">
            <ShieldAlert className="mr-2 h-4 w-4" />
            Ban User
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isAdmin ? "Revoke admin access?" : "Grant admin access?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isAdmin
              ? `Are you sure you want to demote ${user.name}? They will lose dashboard access.`
              : `Are you sure you want to promote ${user.name}? They will have full administrative privileges.`}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>

          <AlertDialogAction
            className={isAdmin ? "bg-destructive hover:bg-destructive/90" : ""}
            disabled={isLoading}
            onClick={handleUpdateRole}
          >
            {isAdmin ? "Revoke Access" : "Confirm Admin"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
