"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
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
import { toastResponse } from "@/lib/toast-helper";

export interface UpdateOrderStatusData {
  orderId: string;
  newStatus: "processing" | "ready" | "completed" | "cancelled";
}

export const UpdateOrderStatusDialog = () => {
  const t = useTranslations("Orders.updateStatus");
  const tNotifications = useTranslations("Notifications");
  const { open, onOpenChange, data } = useAlertDialog<UpdateOrderStatusData>();
  const [isPending, setIsPending] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleUpdateStatus = async () => {
    if (!data) {
      return;
    }

    setIsPending(true);
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

      toast.success(
        toastResponse(tNotifications, {
          messageKey: "order.statusUpdated",
        })
      );
      onOpenChange(false);
      await queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["order-status", data.orderId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["order-payment", data.orderId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["order-customer", data.orderId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["order-deliveries", data.orderId],
        }),
      ]);
      router.refresh();
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error(toastResponse(tNotifications, {}));
      }
    } finally {
      setIsPending(false);
    }
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
