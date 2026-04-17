"use client";

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
import { authClient } from "@/lib/modules/auth/auth-client";
import { usePOS } from "@/lib/modules/pos/state";
import { useCustomerOrder } from "../customer-orders/state";

export const SignoutDialog = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations("Auth");
  const [open, setOpen] = useState(false);
  const { clearPosData } = usePOS();
  const { clearCustomerCart } = useCustomerOrder();

  const { push } = useRouter();

  const onSignout = async () => {
    const { data } = await authClient.signOut();

    if (data) {
      setOpen(false);
      push("/login");
      clearPosData();
      clearCustomerCart();
    }
  };

  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
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
