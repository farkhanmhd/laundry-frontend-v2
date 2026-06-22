import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
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
  type UpdateAdjustmentSchema,
  updateAdjustmentSchema,
} from "@/lib/modules/inventories/schema";
import { toastResponse } from "@/lib/toast-helper";

interface Props {
  id: string;
  note: string;
  changeAmount: number;
}

export function UpdateAdjustmentDialog({ id, note, changeAmount }: Props) {
  const t = useTranslations("Inventories");
  const tNotifications = useTranslations("Notifications");
  const tValidation = useTranslations("Validation");
  const tToast = useTranslations("Toast");
  const { refresh } = useRouter();

  const form = useForm<UpdateAdjustmentSchema>({
    resolver: zodResolver(
      updateAdjustmentSchema
    ) as Resolver<UpdateAdjustmentSchema>,
    mode: "onChange",
    defaultValues: {
      note,
      changeAmount,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: UpdateAdjustmentSchema) => {
      const { data: result } = await elysia.inventories
        .adjustments({
          id,
        })
        .patch(
          {
            changeAmount: data.changeAmount,
            note: data.note,
          },
          { fetch: { credentials: "include" } }
        );
      return result;
    },
    onSuccess: (data) => {
      if (data) {
        toast.success(toastResponse(tNotifications, data));
      }
      form.reset({
        changeAmount: 0,
        note: "",
      });
      refresh();
    },
    onError: () => {
      toast.error(tToast("somethingWentWrong"));
    },
  });

  const onSubmit = form.handleSubmit((data) => mutate(data));

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="outline">
          <SlidersHorizontal />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("stockForm.title")}</AlertDialogTitle>
        </AlertDialogHeader>
        <form className="flex flex-col gap-6" onSubmit={onSubmit}>
          <div className="flex gap-6">
            <FormInput
              disabled={isPending}
              form={form}
              inputMode="numeric"
              label={t("stockForm.changeAmount")}
              name="changeAmount"
              placeholder={t("stockForm.changeAmountPlaceholder")}
              tValidation={tValidation}
            />
          </div>

          <FormInput
            as={Textarea}
            disabled={isPending}
            form={form}
            label={t("stockForm.reasonLabel")}
            name="note"
            placeholder={t("stockForm.reasonPlaceholder")}
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
