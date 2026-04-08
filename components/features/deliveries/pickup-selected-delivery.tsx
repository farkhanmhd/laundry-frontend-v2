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

export const PickupSelectedDelivery = () => {
  const t = useTranslations("Pickups");
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
        throw new Error("Failed to create pickup route");
      }

      if (data?.data?.routeId) {
        toast.success(data.message || "Pickup route created");
        router.push(`/routes/${data.data.routeId}`);
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
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
          <AlertDialogTitle>Create Pickup Route</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to create a pickup route for{" "}
            {selectedIds.length} selected orders?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={handlePickup}>
            {isPending ? "Creating..." : "Confirm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
