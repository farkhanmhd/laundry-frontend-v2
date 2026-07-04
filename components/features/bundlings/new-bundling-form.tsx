"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import { BundlingItemForm } from "@/components/features/bundlings/bundling-item-form";
import { FormInput } from "@/components/forms/form-input";
import type { SelectOption } from "@/components/forms/form-select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { addBundlingAction } from "@/lib/modules/bundlings/actions";
import {
  type AddBundlingSchema,
  addBundlingSchema,
} from "@/lib/modules/bundlings/schema";
import { toastResponse } from "@/lib/toast-helper";
import { formatToIDR, priceFromLabel } from "@/lib/utils";

type Props = {
  services: SelectOption[];
  inventories: SelectOption[];
};

export const NewBundlingForm = ({ services, inventories }: Props) => {
  const t = useTranslations("Bundlings");
  const tValidation = useTranslations("Validation");
  const tNotifications = useTranslations("Notifications");
  const { push } = useRouter();
  const { form, action } = useHookFormAction(
    addBundlingAction,
    zodResolver(addBundlingSchema),
    {
      formProps: {
        mode: "onChange",
        defaultValues: {
          name: "",
          description: "",
          price: 0,
          items: [
            {
              quantity: 0,
            },
          ],
        },
      },
      actionProps: {
        onSettled: ({ result: { data } }) => {
          if (data?.status === "success") {
            toast.success(toastResponse(tNotifications, data));
            push("/bundlings");
          }
        },
      },
    }
  );

  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: "items",
    keyName: "_id",
  });

  const itemPriceTotal = useMemo(() => {
    const allOptions = [...(services ?? []), ...(inventories ?? [])];
    return fields.reduce((acc, field) => {
      const id =
        field.itemType === "service" ? field.serviceId : field.inventoryId;
      const option = allOptions.find((o) => o.value === id);
      if (!option) {
        return acc;
      }
      return acc + field.quantity * priceFromLabel(option.label);
    }, 0);
  }, [fields, services, inventories]);

  const canAddMore = fields.length < 10;

  const onSubmit = (data: AddBundlingSchema) => {
    action.execute(data);
  };

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FormInput
        disabled={action.isPending}
        form={form}
        label={t("form.bundlingName")}
        name="name"
        placeholder="Paket Cuci"
        tValidation={tValidation}
      />
      <FormInput
        as={Textarea}
        disabled={action.isPending}
        form={form}
        label={t("form.bundlingDescription")}
        name="description"
        placeholder="Bundlings description"
        tValidation={tValidation}
      />
      <FormInput
        className="text-right"
        disabled={action.isPending}
        form={form}
        formatValue={(v: unknown) => formatToIDR(Number(v))}
        label={t("form.bundlingPrice")}
        name="price"
        parseValue={(v: string) => Number(v.replace(/[^0-9]/g, ""))}
        placeholder="10000"
        tValidation={tValidation}
      />
      <FormInput
        accept="image/jpeg,image/png,.jpg,.jpeg,.png"
        disabled={action.isPending}
        form={form}
        label={t("form.image")}
        name="image"
        tValidation={tValidation}
        type="file"
      />

      <div className="flex flex-col gap-6 md:flex-row">
        <FormInput
          disabled={action.isPending}
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
        />
      </div>
      <FieldGroup>
        <Controller
          control={form.control}
          name="isCustomerOrderable"
          render={({ field, fieldState }) => (
            <FieldLabel>
              <Field data-invalid={fieldState.invalid} orientation="horizontal">
                <Checkbox
                  checked={!!field.value}
                  disabled={action.isPending}
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

      <div className="flex flex-col gap-6">
        <p className="font-medium">{t("itemsForm.bundlingItems")}</p>
        <div className="flex flex-col gap-6">
          {fields.map((field, index) => (
            <BundlingItemForm
              disabled={action.isPending}
              field={field}
              form={form}
              index={index}
              inventories={inventories}
              key={field._id}
              onDeleteClick={() => remove(index)}
              removable={fields.length > 1}
              services={services}
              update={update}
            />
          ))}
        </div>
        <p className="text-muted-foreground text-sm">
          {t("itemsForm.itemPriceTotal")}: {formatToIDR(itemPriceTotal)}
        </p>

        {canAddMore && (
          <Button
            disabled={action.isPending}
            onClick={() => append({ itemType: "inventory", quantity: 0 })}
            type="button"
            variant="outline"
          >
            <Plus />
            <span>{t("itemsForm.addItem")}</span>
          </Button>
        )}
        <FieldError
          errors={
            form.formState.errors.items &&
            !Array.isArray(form.formState.errors.items)
              ? [form.formState.errors.items]
              : undefined
          }
        />
      </div>

      <Button disabled={action.isPending} type="submit">
        {t("form.createNew")}
      </Button>
    </form>
  );
};
