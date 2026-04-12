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

export const CustomerPaymentDialog = () => {
  const t = useTranslations("CustomerOrders.orderDetail");
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const params = useParams();
  const { push } = useRouter();

  const handlePayment = () => {
    startTransition(async () => {
      try {
        const { error } = await elysia
          .customerorders({ id: params.id as string })
          .payment.post({}, { fetch: { credentials: "include" } });

        if (error) {
          throw new Error(error.value?.message || "Failed to process payment");
        }

        toast.success("QRIS Payment Created");
        setOpen(false);
        push(`/customer-orders/${params.id}/payment`);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
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
