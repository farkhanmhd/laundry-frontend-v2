"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { toast } from "sonner";
import { DateTimePicker } from "@/components/forms/date-time-picker";
import { FormInput } from "@/components/forms/form-input";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { adjustQuantityAction } from "@/lib/modules/inventories/actions";
import {
  type AdjustQuantitySchema,
  adjustQuantitySchema,
} from "@/lib/modules/inventories/schema";
import { toastResponse } from "@/lib/toast-helper";
import { translateZodError } from "@/lib/translate-zod-error";

type Props = {
  id: string;
  name: string;
  currentQuantity: number;
};

export const StockAdjustmentForm = ({ id, currentQuantity, name }: Props) => {
  const t = useTranslations("Inventories");
  const tNotifications = useTranslations("Notifications");
  const tValidation = useTranslations("Validation");
  const [isEditing, setIsEditing] = useState(false);
  const [localCurrentQuantity, setLocalCurrentQuantity] =
    useState(currentQuantity);
  const { refresh } = useRouter();

  const defaultValues: AdjustQuantitySchema = {
    id,
    currentQuantity,
    note: "",
    changeAmount: 0,
    adjustmentTime: new Date(),
  };

  const { form, action } = useHookFormAction(
    adjustQuantityAction,
    zodResolver(adjustQuantitySchema),
    {
      formProps: {
        mode: "onChange",
        defaultValues,
      },
      actionProps: {
        onSettled: ({ result: { data } }) => {
          if (data?.status === "success") {
            toast.success(toastResponse(tNotifications, data));

            const changeAmount = Number(form.getValues("changeAmount"));
            const newQuantity = localCurrentQuantity + changeAmount;
            setLocalCurrentQuantity(newQuantity);

            form.reset({
              id,
              currentQuantity: newQuantity,
              changeAmount: 0,
              note: "",
            });
            setIsEditing(false);
            refresh();
          }
        },
      },
    }
  );

  const onSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    const formData: AdjustQuantitySchema = {
      id,
      currentQuantity: localCurrentQuantity,
      changeAmount: Number(form.watch("changeAmount")),
      note: form.watch("note"),
      adjustmentTime: form.watch("adjustmentTime"),
    };
    action.execute(formData);
  };

  const handleCancel = () => {
    form.reset({
      ...defaultValues,
      currentQuantity: localCurrentQuantity,
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-semibold text-xl">{`${t("stockForm.title")} - ${name}`}</h2>
        <p className="text-muted-foreground text-sm">
          {t("stockForm.description")}
        </p>
      </div>

      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        {/* Current quantity is always disabled, but reactive */}
        <div className="flex gap-6">
          <FormInput
            disabled
            form={form}
            label={t("stockForm.currentQuantity")}
            name="currentQuantity"
            placeholder={t("stockForm.currentQuantityPlaceholder")}
            tValidation={tValidation}
            value={localCurrentQuantity}
          />

          <FormInput
            disabled={!isEditing || action.isPending}
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
                    disabled={!isEditing || action.isPending}
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
          disabled={!isEditing || action.isPending}
          form={form}
          label={t("stockForm.reasonLabel")}
          name="note"
          placeholder={t("stockForm.reasonPlaceholder")}
          tValidation={tValidation}
        />

        <div className="flex justify-end gap-3">
          {isEditing ? (
            <>
              <Button
                disabled={action.isPending}
                onClick={handleCancel}
                type="button"
                variant="ghost"
              >
                {t("form.cancel")}
              </Button>
              <Button
                disabled={action.isPending || !form.formState.isDirty}
                type="submit"
              >
                {t("form.saveChanges")}
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} type="button">
              {t("form.edit")}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
