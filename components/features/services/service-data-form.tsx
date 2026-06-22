"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { toast } from "sonner";
import { FormInput } from "@/components/forms/form-input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { updateServiceAction } from "@/lib/modules/services/actions";
import {
  type UpdateServiceSchema,
  updateServiceSchema,
} from "@/lib/modules/services/schema";
import { toastResponse } from "@/lib/toast-helper";
import { formatToIDR } from "@/lib/utils";

export const ServiceDataForm = ({
  id,
  name,
  description,
  price,
  maxWeight,
  isCustomerOrderable,
}: UpdateServiceSchema) => {
  const t = useTranslations("Services");
  const tValidation = useTranslations("Validation");
  const tNotifications = useTranslations("Notifications");
  const [isEditing, setIsEditing] = useState(false);

  const { form, action } = useHookFormAction(
    updateServiceAction,
    zodResolver(updateServiceSchema),
    {
      formProps: {
        mode: "onChange",
        values: {
          name,
          description,
          price,
          id,
          maxWeight: maxWeight ?? null,
          isCustomerOrderable: isCustomerOrderable ?? null,
        },
      },
      actionProps: {
        onSettled: ({ result: { data } }) => {
          if (data?.status === "success") {
            toast.success(toastResponse(tNotifications, data));
            setIsEditing(false);
          }
        },
      },
    }
  );

  const onSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    const formData: UpdateServiceSchema = {
      id,
      name: form.getValues("name"),
      description: form.getValues("description"),
      price: Number(form.getValues("price")),
      maxWeight: Number(form.getValues("maxWeight")) || null,
      isCustomerOrderable: form.getValues("isCustomerOrderable") ?? false,
    };

    action.execute(formData);
    console.log(action.result);
  };

  const handleCancel = () => {
    form.reset({ name, description, price, maxWeight, isCustomerOrderable });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-semibold text-xl">{t("form.serviceData")}</h2>
        <p className="text-muted-foreground text-sm">
          {t("form.serviceDataDescription")}
        </p>
      </div>
      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        <FormInput
          defaultValue={name}
          disabled={!isEditing || action.isPending}
          form={form}
          label={t("form.serviceName")}
          name="name"
          placeholder="Setrika"
          tValidation={tValidation}
        />
        <FormInput
          as={Textarea}
          defaultValue={description}
          disabled={!isEditing || action.isPending}
          form={form}
          label={t("form.serviceDescription")}
          name="description"
          placeholder="Service description"
          tValidation={tValidation}
        />
        <FormInput
          className="text-right"
          defaultValue={price}
          disabled={!isEditing || action.isPending}
          form={form}
          formatValue={(v: unknown) => formatToIDR(Number(v))}
          label={t("form.servicePrice")}
          name="price"
          parseValue={(v: string) => Number(v.replace(/[^0-9]/g, ""))}
          placeholder="10000"
          tValidation={tValidation}
        />
        <div className="flex flex-col gap-6 md:flex-row">
          <FormInput
            defaultValue={maxWeight ?? undefined}
            disabled={!isEditing || action.isPending}
            form={form}
            label={t("form.maxWeight")}
            name="maxWeight"
            placeholder="10"
            tValidation={tValidation}
            type="number"
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
                    onCheckedChange={(checked) =>
                      field.onChange(checked || null)
                    }
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
