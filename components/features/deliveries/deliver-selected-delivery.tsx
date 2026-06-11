"use client";

import { useQueries, useQueryClient } from "@tanstack/react-query";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { elysia } from "@/elysia";
import { toastResponse } from "@/lib/toast-helper";

export const DeliverSelectedDelivery = () => {
  const t = useTranslations("Deliveries");
  const tNotifications = useTranslations("Notifications");
  const { table } = useTableContext<{ id: string }>();
  const [isPending, setIsPending] = useState(false);
  const [open, setOpen] = useState(false);
  const [driverId, setDriverId] = useState("");
  const [assetId, setAssetId] = useState("");
  const queryClient = useQueryClient();
  const [driverResult, assetResult] = useQueries({
    queries: [
      {
        queryKey: ["drivers"],
        queryFn: async () => {
          const response = await elysia.drivers.get({
            fetch: {
              credentials: "include",
            },
          });

          if (response.data) {
            return response.data.data.drivers;
          }
        },
      },
      {
        queryKey: ["assets"],
        queryFn: async () => {
          const response = await elysia.assets.get({
            fetch: {
              credentials: "include",
            },
          });

          if (response.data) {
            return response.data.data.assets;
          }
        },
      },
    ],
  });

  const selectedIds = Object.keys(table.getSelectedRowModel().rowsById);

  const driverOptions = driverResult.data?.map((driver) => ({
    label: driver.name,
    value: driver.id,
  }));

  const assetOptions = assetResult.data?.map((asset) => ({
    label: `${asset.name} - ${asset.licensePlate}`,
    value: asset.id,
  }));

  if (!selectedIds.length) {
    return null;
  }

  const handleDeliver = async () => {
    if (!(driverId && assetId)) {
      return;
    }

    setIsPending(true);
    try {
      const { data, error } = await elysia.deliveries.post(
        {
          deliveryIds: selectedIds,
          driverId,
          assetId,
        },
        {
          fetch: {
            credentials: "include",
          },
        }
      );

      if (error) {
        toast.error(
          toastResponse(
            tNotifications,
            error.value || {
              messageKey: "Notifications.delivery.route.deliverFailed",
            }
          )
        );
        setIsPending(false);
        return;
      }

      if (data?.data?.routeId) {
        toast.success(toastResponse(tNotifications, data));
        queryClient.invalidateQueries({ queryKey: ["deliveries"] });
        queryClient.invalidateQueries({ queryKey: ["routes"] });
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
    <AlertDialog onOpenChange={setOpen} open={open}>
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
        <div className="space-y-4">
          <div className="space-y-3">
            <Label htmlFor="driver-select">{t("selectDriver")}</Label>
            <Select
              disabled={isPending}
              onValueChange={setDriverId}
              value={driverId}
            >
              <SelectTrigger className="w-full" id="driver-select">
                <SelectValue placeholder={t("selectDriver")} />
              </SelectTrigger>
              <SelectContent>
                {driverOptions?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <Label htmlFor="asset-select">{t("selectAsset")}</Label>
            <Select
              disabled={isPending}
              onValueChange={setAssetId}
              value={assetId}
            >
              <SelectTrigger className="w-full" id="asset-select">
                <SelectValue placeholder={t("selectAsset")} />
              </SelectTrigger>
              <SelectContent>
                {assetOptions?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>
            {t("cancel")}
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending || !driverId || !assetId}
            onClick={handleDeliver}
          >
            {isPending ? t("creating") : t("confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
