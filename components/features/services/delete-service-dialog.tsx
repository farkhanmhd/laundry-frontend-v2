"use client";

import { Trash2 } from "lucide-react";
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
import { deleteServiceAction } from "@/lib/modules/services/actions";
import type { Service } from "@/lib/modules/services/data";

interface DeleteServiceDialogProps {
  id: string;
}

export function DeleteServiceDialog({ id }: DeleteServiceDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { setInternalData } = useTableContext<Service>();
  const t = useTranslations("Services");

  const handleDelete = async () => {
    setIsPending(true);
    const result = await deleteServiceAction({ id });

    if (result?.data?.status === "success") {
      toast.success(result.data.message);
      setInternalData((prev) => prev.filter((item) => item.id !== id));
      setOpen(false);
    } else {
      toast.error(result?.data?.message ?? "Something went wrong");
    }

    setIsPending(false);
  };

  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger asChild>
        <Button
          className="text-destructive"
          size="icon-sm"
          variant="ghost"
        >
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("deleteDialog.title")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("deleteDialog.description")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>
            {t("deleteDialog.cancel")}
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive/90"
            disabled={isPending}
            onClick={handleDelete}
          >
            {t("deleteDialog.confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
