"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";
import { useTableContext } from "@/components/table/context";
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

export const PickupSelectedDelivery = () => {
  const t = useTranslations("Pickups");
  const tNotifications = useTranslations("Notifications");
  const { table } = useTableContext<{ id: string }>();
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const selectedIds = Object.keys(table.getSelectedRowModel().rowsById);

  if (!selectedIds.length) {
    return null;
  }

  const handlePickup = async () => {
    setIsPending(true);
    try {
      const { data, error } = await elysia.deliveries.post(
        {
          deliveryIds: selectedIds,
        },
        {
          fetch: {
            credentials: "include",
          },
        }
      );

      if (error) {
        toast.error(
          toastResponse(tNotifications, error.value || {
            messageKey: "Notifications.delivery.route.pickupFailed",
          })
        );
        setIsPending(false);
        return;
      }

      if (data?.data?.routeId) {
        toast.success(toastResponse(tNotifications, data));
        router.push(`/routes/${data.data.routeId}`);
      }
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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="flex rounded-none border-l">
          {t("selectedRows", { count: selectedIds.length })}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("createRoute")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("createRouteDescription", { count: selectedIds.length })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>{t("cancel")}</AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={handlePickup}>
            {isPending ? t("creating") : t("confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
