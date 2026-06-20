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
import { restockInventoryAction } from "@/lib/modules/inventories/actions";
import {
  type RestockInventorySchema,
  restockInventorySchema,
} from "@/lib/modules/inventories/schema";
import { toastResponse } from "@/lib/toast-helper";
import { translateZodError } from "@/lib/translate-zod-error";
import { formatToIDR } from "@/lib/utils";

type Props = {
  id: string;
  name: string;
  currentQuantity: number;
};

export const InventoryRestockForm = ({ id, currentQuantity, name }: Props) => {
  const t = useTranslations("Inventories");
  const tNotifications = useTranslations("Notifications");
  const tValidation = useTranslations("Validation");
  const [isEditing, setIsEditing] = useState(false);
  const { refresh } = useRouter();

  const defaultValues: RestockInventorySchema = {
    id,
    currentQuantity,
    supplier: "",
    restockQuantity: 0,
    restockPrice: 0,
    restockTime: new Date(),
    note: "",
  };

  const { form, action } = useHookFormAction(
    restockInventoryAction,
    zodResolver(restockInventorySchema),
    {
      formProps: {
        mode: "onChange",
        defaultValues,
      },
      actionProps: {
        onSettled: ({ result: { data } }) => {
          if (data?.status === "success") {
            toast.success(toastResponse(tNotifications, data));

            form.reset({
              id,
              supplier: "",
              restockQuantity: 0,
              restockTime: new Date(),
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
    const formData: RestockInventorySchema = {
      id,
      currentQuantity,
      supplier: form.watch("supplier"),
      restockQuantity: Number(form.watch("restockQuantity")),
      restockTime: form.watch("restockTime"),
      restockPrice: Number(form.watch("restockPrice")),
      note: form.watch("note"),
    };

    action.execute(formData);
  };

  const handleCancel = () => {
    form.reset(defaultValues);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-semibold text-xl">{`${t("restockForm.title")} - ${name}`}</h2>
        <p className="text-muted-foreground text-sm">
          {t("restockForm.description")}
        </p>
      </div>

      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        <div className="flex gap-6">
          <FormInput
            disabled
            form={form}
            label={t("stockForm.currentQuantity")}
            name="currentQuantity"
            placeholder={t("stockForm.currentQuantityPlaceholder")}
            tValidation={tValidation}
            value={currentQuantity}
          />

          <FormInput
            disabled={!isEditing || action.isPending}
            form={form}
            inputMode="numeric"
            label={t("restockForm.restockQuantity")}
            name="restockQuantity"
            placeholder={t("restockForm.restockQuantityPlaceholder")}
            tValidation={tValidation}
          />
        </div>

        <FormInput
          disabled={!isEditing || action.isPending}
          form={form}
          label={t("restockForm.supplier")}
          name="supplier"
          placeholder={t("restockForm.supplierPlaceholder")}
          tValidation={tValidation}
        />

        <div className="flex gap-6">
          <FormInput
            className="text-right"
            disabled={!isEditing || action.isPending}
            form={form}
            formatValue={(v: unknown) => formatToIDR(Number(v))}
            label={t("restockForm.restockPrice")}
            name="restockPrice"
            parseValue={(v: string) => Number(v.replace(/[^0-9]/g, ""))}
            placeholder="Harga Restock"
            tValidation={tValidation}
          />

          <FieldGroup>
            <Controller
              control={form.control}
              name="restockTime"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-base" htmlFor={field.name}>
                    {t("restockForm.restockTime")}
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
          label={t("restockForm.noteLabel")}
          name="note"
          placeholder={t("restockForm.notePlaceholder")}
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
