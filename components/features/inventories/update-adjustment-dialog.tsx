import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Controller, type Resolver, useForm } from "react-hook-form";
import { toast } from "sonner";
import { DateTimePicker } from "@/components/forms/date-time-picker";
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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { elysia } from "@/elysia";
import {
  type AdjustQuantityBodySchema,
  adjustQuantityBodySchema,
} from "@/lib/modules/inventories/schema";
import { toastResponse } from "@/lib/toast-helper";
import { translateZodError } from "@/lib/translate-zod-error";

interface Props {
  id: string;
  note: string;
  changeAmount: number;
  adjustmentTime: Date;
}

export function UpdateAdjustmentDialog({
  id,
  note,
  changeAmount,
  adjustmentTime,
}: Props) {
  const t = useTranslations("Inventories");
  const tNotifications = useTranslations("Notifications");
  const tValidation = useTranslations("Validation");
  const tToast = useTranslations("Toast");
  const { refresh } = useRouter();

  const form = useForm<AdjustQuantityBodySchema>({
    resolver: zodResolver(
      adjustQuantityBodySchema
    ) as Resolver<AdjustQuantityBodySchema>,
    mode: "onChange",
    defaultValues: {
      note,
      changeAmount,
      adjustmentTime,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: AdjustQuantityBodySchema) => {
      const { data: result } = await elysia.inventories
        .adjustments({
          id,
        })
        .patch(
          {
            changeAmount: data.changeAmount,
            adjustmentTime: data.adjustmentTime,
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
        adjustmentTime: new Date(),
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

            <FieldGroup>
              <Controller
                control={form.control}
                name="adjustmentTime"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-base" htmlFor={field.name}>
                      {t("stockForm.adjustmentTime")}
                    </FieldLabel>
                    <DateTimePicker
                      date={field.value}
                      disabled={isPending}
                      onChange={field.onChange}
                    />
                    {fieldState.invalid && fieldState.error && (
                      <FieldError
                        errors={[
                          {
                            ...fieldState.error,
                            message: translateZodError(
                              fieldState.error.message || "",
                              tValidation
                            ),
                          },
                        ]}
                      />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
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
