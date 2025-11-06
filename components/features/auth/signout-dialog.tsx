"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";

export const SignoutDialog = () => {
  const [open, setOpen] = useState(false);
  const { push } = useRouter();

  const onSignout = async () => {
    const { data } = await authClient.signOut();

    if (data) {
      setOpen(false);
      push("/login");
    }
  };

  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger asChild>
        <SidebarMenuButton>
          <LogOut />
          <span>Sign Out</span>
        </SidebarMenuButton>
      </AlertDialogTrigger>
      <AlertDialogContent className="z-200">
        <AlertDialogHeader>
          <AlertDialogTitle>Sign out</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="text-center sm:text-start">
          Are you sure you want to sign out?
        </AlertDialogDescription>
        <AlertDialogFooter>
          <Button onClick={() => setOpen(false)} variant="ghost">
            Cancel
          </Button>
          <Button onClick={onSignout} variant="destructive">
            Sign out
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
