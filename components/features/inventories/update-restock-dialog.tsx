import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { type Resolver, useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormInput } from "@/components/forms/form-input";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { elysia } from "@/elysia";
import {
  type UpdateRestockQuantity,
  updateRestockQuantity,
} from "@/lib/modules/inventories/schema";
import { toastResponse } from "@/lib/toast-helper";

interface Props {
  id: string;
  note: string;
  restockQuantity: number;
}

export function UpdateRestockDialog({ id, note, restockQuantity }: Props) {
  const t = useTranslations("Inventories");
  const tNotifications = useTranslations("Notifications");
  const tValidation = useTranslations("Validation");
  const tToast = useTranslations("Toast");
  const { refresh } = useRouter();
  const [open, setOpen] = useState(false);

  const form = useForm<UpdateRestockQuantity>({
    resolver: zodResolver(
      updateRestockQuantity
    ) as Resolver<UpdateRestockQuantity>,
    mode: "onChange",
    defaultValues: {
      note,
      restockQuantity,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: UpdateRestockQuantity) => {
      const { data: result } = await elysia.inventories["restock-history"]({
        id,
      }).patch(
        {
          restockQuantity: data.restockQuantity,
          note: data.note,
        },
        { fetch: { credentials: "include" } }
      );
      return result;
    },
    onSuccess: (data) => {
      if (data && data.status === "success") {
        toast.success(toastResponse(tNotifications, data));
        setOpen(false);
        refresh();
      }
    },
    onError: () => {
      toast.error(tToast("somethingWentWrong"));
    },
  });

  const onSubmit = form.handleSubmit((data) => mutate(data));

  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="outline">
          <SlidersHorizontal />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("restockForm.title")}</AlertDialogTitle>
        </AlertDialogHeader>
        <form className="flex flex-col gap-6" onSubmit={onSubmit}>
          <div className="flex gap-6">
            <FormInput
              disabled={isPending}
              form={form}
              inputMode="numeric"
              label={t("restockForm.restockQuantity")}
              name="restockQuantity"
              placeholder={t("restockForm.restockQuantityPlaceholder")}
              tValidation={tValidation}
            />
          </div>

          <FormInput
            as={Textarea}
            disabled={isPending}
            form={form}
            label={t("restockForm.noteLabel")}
            name="note"
            placeholder={t("restockForm.notePlaceholder")}
            tValidation={tValidation}
          />

          <div className="flex justify-end gap-3">
            <AlertDialogCancel>{t("form.cancel")}</AlertDialogCancel>
            <Button
              disabled={isPending || !form.formState.isDirty}
              type="submit"
            >
              {t("form.saveChanges")}
            </Button>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
