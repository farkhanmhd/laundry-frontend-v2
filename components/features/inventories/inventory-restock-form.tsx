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

type Props = {
  id: string;
  currentQuantity: number;
};

export const InventoryRestockForm = ({ id, currentQuantity }: Props) => {
  const t = useTranslations("Inventories");
  const [isEditing, setIsEditing] = useState(false);
  const { refresh } = useRouter();

  const defaultValues: RestockInventorySchema = {
    id,
    currentQuantity,
    supplier: "",
    restockQuantity: 0,
    restockTime: new Date(),
    note: "",
  };

  const { form, action } = useHookFormAction(
    restockInventoryAction,
    zodResolver(restockInventorySchema),
    {
      formProps: {
        mode: "onChange",
      },
      actionProps: {
        onSettled: ({ result: { data } }) => {
          if (data?.status === "success") {
            toast.success(data.message);

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

  console.log(action.result);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData: RestockInventorySchema = {
      id,
      currentQuantity,
      supplier: form.watch("supplier"),
      restockQuantity: Number(form.watch("restockQuantity")),
      restockTime: form.watch("restockTime"),
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
        <h2 className="font-semibold text-xl">{t("restockForm.title")}</h2>
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
            value={currentQuantity}
          />

          <FormInput
            disabled={!isEditing || action.isPending}
            form={form}
            inputMode="numeric"
            label={t("restockForm.restockQuantity")}
            name="restockQuantity"
            placeholder={t("restockForm.restockQuantityPlaceholder")}
          />
        </div>

        <FormInput
          disabled={!isEditing || action.isPending}
          form={form}
          label={t("restockForm.supplier")}
          name="supplier"
          placeholder={t("restockForm.supplierPlaceholder")}
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
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <FormInput
          as={Textarea}
          disabled={!isEditing || action.isPending}
          form={form}
          label={t("restockForm.noteLabel")}
          name="note"
          placeholder={t("restockForm.notePlaceholder")}
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
