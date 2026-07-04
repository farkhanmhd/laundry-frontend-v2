"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { toast } from "sonner";
import { FormInput } from "@/components/forms/form-input";
import { FormSelect } from "@/components/forms/form-select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateInventoryAction } from "@/lib/modules/inventories/actions";
import {
  type UpdateInventorySchema,
  units,
  updateInventorySchema,
} from "@/lib/modules/inventories/schema";
import { toastResponse } from "@/lib/toast-helper";
import { formatToIDR } from "@/lib/utils";

export const InventoryDataForm = ({
  id,
  name,
  description,
  price,
  unit,
  safetyStock,
  maxWeight,
  isCustomerOrderable,
}: UpdateInventorySchema) => {
  const t = useTranslations("Inventories");
  const tNotifications = useTranslations("Notifications");
  const tValidation = useTranslations("Validation");
  const [isEditing, setIsEditing] = useState(false);

  const { form, action } = useHookFormAction(
    updateInventoryAction,
    zodResolver(updateInventorySchema),
    {
      formProps: {
        mode: "onChange",
        values: {
          name,
          description,
          price,
          safetyStock,
          unit,
          id,
          maxWeight,
          isCustomerOrderable: isCustomerOrderable ?? null,
        },
      },
      actionProps: {
        onSettled: ({ result: { data } }) => {
          if (data?.status === "success") {
            toast.success(toastResponse(tNotifications, data));
            setIsEditing(false); // exit edit mode after successful save
          }
        },
      },
    }
  );

  const onSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    const formData: UpdateInventorySchema = {
      id,
      name: form.getValues("name"),
      description: form.getValues("description"),
      price: Number(form.getValues("price")),
      safetyStock: Number(form.getValues("safetyStock")),
      unit: form.getValues("unit"),
      maxWeight: Number(form.getValues("maxWeight")) || null,
      isCustomerOrderable: form.getValues("isCustomerOrderable") ?? false,
    };

    action.execute(formData);
  };

  const handleCancel = () => {
    form.reset({
      name,
      description,
      price,
      safetyStock,
      maxWeight,
      isCustomerOrderable,
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-semibold text-xl">{`${t("form.inventoryData")} - ${name}`}</h2>
        <p className="text-muted-foreground text-sm">
          {t("form.inventoryDataDescription")}
        </p>
      </div>
      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        <FormInput
          defaultValue={name}
          disabled={!isEditing || action.isPending}
          form={form}
          label={t("form.inventoryName")}
          name="name"
          placeholder="Sabun Cair"
          tValidation={tValidation}
        />
        <FormInput
          as={Textarea}
          defaultValue={description}
          disabled={!isEditing || action.isPending}
          form={form}
          label={t("form.inventoryDescription")}
          name="description"
          placeholder="Inventory description"
          tValidation={tValidation}
        />
        <FormInput
          className="text-right"
          defaultValue={price}
          disabled={!isEditing || action.isPending}
          form={form}
          formatValue={(v: unknown) => formatToIDR(Number(v))}
          label={t("form.inventoryPrice")}
          name="price"
          parseValue={(v: string) => Number(v.replace(/[^0-9]/g, ""))}
          placeholder="10000"
          tValidation={tValidation}
        />
        <div className="flex flex-col gap-6 md:flex-row">
          <FormInput
            defaultValue={safetyStock}
            disabled={!isEditing || action.isPending}
            form={form}
            label={t("form.safetyStockLabel")}
            name="safetyStock"
            placeholder="Safety Stock"
            tValidation={tValidation}
          />
          <div className="flex flex-col gap-3">
            <Label className="text-base" htmlFor="unit">
              {t("form.unit")}
            </Label>
            <Controller
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormSelect
                  disabled={!isEditing || action.isPending}
                  id="unit"
                  onValueChange={field.onChange}
                  options={units}
                  value={field.value}
                />
              )}
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 md:flex-row">
          <FormInput
            defaultValue={maxWeight ?? undefined}
            disabled={!isEditing || action.isPending}
            form={form}
            inputMode="numeric"
            label={t("form.maxWeight")}
            name="maxWeight"
            parseValue={(v: string) => {
              if (v === "") {
                return null;
              }
              const n = Number(v);
              return Number.isNaN(n) ? null : n;
            }}
            placeholder="10"
            tValidation={tValidation}
            type="text"
          />
        </div>

        <FieldGroup>
          <Controller
            control={form.control}
            name="isCustomerOrderable"
            render={({ field, fieldState }) => (
              <FieldLabel>
                <Field
                  data-invalid={fieldState.invalid}
                  orientation="horizontal"
                >
                  <Checkbox
                    checked={!!field.value}
                    disabled={!isEditing || action.isPending}
                    id={field.name}
                    name={field.name}
                    onCheckedChange={(checked) => field.onChange(checked)}
                  />
                  <FieldContent>
                    <FieldTitle>{t("form.isCustomerOrderable")}</FieldTitle>
                  </FieldContent>
                </Field>
              </FieldLabel>
            )}
          />
        </FieldGroup>

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
