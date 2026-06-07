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
import type { Delivery } from "@/lib/modules/routes/data";

export const UpdateDeliveryDialog = () => {
  const { open, onOpenChange, data } = useAlertDialog<Delivery>();
  const t = useTranslations("Routes");
  const tNotifications = useTranslations("Notifications");

  const [isPending, setIsPending] = useState(false);
  const { refresh } = useRouter();

  const handleDeliveryUpdate = async () => {
    if (!data) {
      return;
    }

    setIsPending(true);
    try {
      const { data: responseData, error } = await elysia
        .deliveries({ id: data.id })
        .status.patch({}, { fetch: { credentials: "include" } });

      if (error) {
        throw error.value;
      }

      toast.success(toastResponse(tNotifications, responseData));
      onOpenChange(false);
      refresh();
    } catch (err) {
      toast.error(
        toastResponse(
          tNotifications,
          (err as { messageKey?: string; message?: string }) || {}
        )
      );
    } finally {
      setIsPending(false);
    }
  };

  return (
    <AlertDialog onOpenChange={onOpenChange} open={open || isPending}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("confirmPickup")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("confirmPickupDescription", {
              customerName: data?.customerName,
            })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>{t("cancel")}</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={handleDeliveryUpdate}
          >
            {t("confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
