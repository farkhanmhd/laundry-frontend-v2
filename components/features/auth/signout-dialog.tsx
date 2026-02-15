"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
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
import { authClient } from "@/lib/modules/auth/auth-client";
import { usePOS } from "@/lib/modules/pos/state";

export const SignoutDialog = () => {
  const t = useTranslations("Auth");
  const [open, setOpen] = useState(false);
  const { clearPosData } = usePOS();

  const { push } = useRouter();

  const onSignout = async () => {
    const { data } = await authClient.signOut();

    if (data) {
      setOpen(false);
      push("/login");
      clearPosData();
    }
  };

  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger asChild>
        <SidebarMenuButton
          className="flex aspect-square items-center p-2 group-data-[collapsible=icon]:size-full! md:justify-center md:text-muted-foreground [&>svg]:size-5"
          size="lg"
        >
          <LogOut />
          <span className="md:hidden">{t("signOut")}</span>
        </SidebarMenuButton>
      </AlertDialogTrigger>
      <AlertDialogContent className="z-200">
        <AlertDialogHeader>
          <AlertDialogTitle>{t("signOutTitle")}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="text-center sm:text-start">
          {t("signOutDescription")}
        </AlertDialogDescription>
        <AlertDialogFooter>
          <Button onClick={() => setOpen(false)} variant="ghost">
            {t("cancel")}
          </Button>
          <Button onClick={onSignout} variant="destructive">
            {t("signOut")}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
