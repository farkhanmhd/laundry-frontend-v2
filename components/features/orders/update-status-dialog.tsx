"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { toast } from "sonner";
import { useAlertDialog } from "@/components/providers/alert-dialog-provider";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { elysia } from "@/elysia";

export interface UpdateOrderStatusData {
  orderId: string;
  newStatus: "processing" | "ready" | "completed" | "cancelled";
}

export const UpdateOrderStatusDialog = () => {
  const t = useTranslations("Orders.updateStatus");
  const router = useRouter();
  const { open, onOpenChange, data } = useAlertDialog<UpdateOrderStatusData>();
  const [isPending, startTransition] = useTransition();

  const handleUpdateStatus = () => {
    if (!data) {
      return;
    }

    startTransition(async () => {
      try {
        const { error } = await elysia
          .orders({ id: data.orderId })
          .status.patch(
            {},
            {
              fetch: { credentials: "include" },
            }
          );

        if (error) {
          throw new Error(
            error.value?.message || "Failed to update order status"
          );
        }

        toast.success(t("statusUpdated"));
        onOpenChange(false);
        router.refresh();
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message);
        }
      }
    });
  };

  return (
    <AlertDialog onOpenChange={onOpenChange} open={open || isPending}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("confirmTitle")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("confirmDescription", { status: data?.newStatus })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>
            {t("cancel")}
          </AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={handleUpdateStatus}>
            {isPending ? t("updating") : t("confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
