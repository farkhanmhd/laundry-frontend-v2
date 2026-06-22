"use client";

import { useMutation } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { elysia } from "@/elysia";
import { toastResponse } from "@/lib/toast-helper";

interface DeleteAdjustmentProps {
  id: string;
}

export function DeleteAdjustment({ id }: DeleteAdjustmentProps) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("Inventories");
  const tNotifications = useTranslations("Notifications");
  const tToast = useTranslations("Toast");
  const { refresh } = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const { data: result } = await elysia.inventories
        .adjustments({ id })
        .delete({}, { fetch: { credentials: "include" } });
      return result;
    },
    onSuccess: (data) => {
      if (data && data.status === "success") {
        toast.success(toastResponse(tNotifications, data));
        setOpen(false);
        refresh();
      }
    },
    onError: () => {
      toast.error(tToast("somethingWentWrong"));
    },
  });

  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="outline">
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("adjustmentDeleteDialog.title")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("adjustmentDeleteDialog.description")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>
            {t("deleteDialog.cancel")}
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive/90"
            disabled={isPending}
            onClick={() => mutate()}
          >
            {t("deleteDialog.confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
