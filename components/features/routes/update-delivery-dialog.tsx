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
import type { Delivery } from "@/lib/modules/routes/data";

export const UpdateDeliveryDialog = () => {
  const { open, onOpenChange, data } = useAlertDialog<Delivery>();
  const t = useTranslations("Routes");

  const [isPending, startTransition] = useTransition();
  const { refresh } = useRouter();

  const handleDeliveryUpdate = () => {
    if (!data) {
      return;
    }

    startTransition(async () => {
      try {
        const { error } = await elysia
          .deliveries({ id: data.id })
          .status.patch({}, { fetch: { credentials: "include" } });

        if (error) {
          throw new Error(
            error.value?.message || "Failed to update delivery status"
          );
        }

        toast.success("Delivery status updated successfully");
        onOpenChange(false);
        refresh();
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
          <AlertDialogTitle>{t("confirmPickup")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("confirmPickupDescription", {
              customerName: data?.customerName,
            })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={handleDeliveryUpdate}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
