"use client";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";
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

export const CustomerPaymentDialog = () => {
  const t = useTranslations("CustomerOrders.orderDetail");
  const tNotifications = useTranslations("Notifications");
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const params = useParams();
  const { push } = useRouter();

  const handlePayment = () => {
    startTransition(async () => {
      try {
        const { data, error } = await elysia
          .customerorders({ id: params.id as string })
          .payment.post({}, { fetch: { credentials: "include" } });

        if (error) {
          throw error.value || new Error("Failed to process payment");
        }

        toast.success(toastResponse(tNotifications, data || {}));
        setOpen(false);
        push(`/customer-orders/${params.id}/payment`);
      } catch (error) {
        toast.error(
          toastResponse(
            tNotifications,
            (error as { messageKey?: string; message?: string }) || {}
          )
        );
      }
    });
  };

  return (
    <AlertDialog onOpenChange={setOpen} open={open || isPending}>
      <AlertDialogTrigger asChild>
        <Button className="w-full">{t("payWithQris")}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("confirmPaymentTitle")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("confirmPaymentDescription")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>
            {t("cancel")}
          </AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={handlePayment}>
            {t("confirmPayment")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
