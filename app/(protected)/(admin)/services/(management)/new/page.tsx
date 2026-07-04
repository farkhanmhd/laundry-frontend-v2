"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
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
import { addServiceAction } from "@/lib/modules/services/actions";
import { addServiceSchema } from "@/lib/modules/services/schema";
import { toastResponse } from "@/lib/toast-helper";
import { formatToIDR } from "@/lib/utils";

const NewServicePage = () => {
  const t = useTranslations("Services");
  const tValidation = useTranslations("Validation");
  const tNotifications = useTranslations("Notifications");
  const { push } = useRouter();
  const { form, handleSubmitWithAction, action } = useHookFormAction(
    addServiceAction,
    zodResolver(addServiceSchema),
    {
      formProps: {
        mode: "onChange",
      },
      actionProps: {
        onSettled: ({ result: { data } }) => {
          if (data?.status === "success") {
            toast.success(toastResponse(tNotifications, data));
            push("/services");
          }
        },
      },
    }
  );

  return (
    <div className="h-full space-y-4 p-6 lg:mx-auto lg:max-w-3xl">
      <div>
        <h1 className="font-semibold text-2xl">{t("form.createNew")}</h1>
        <p className="text-muted-foreground text-sm">
          {t("form.createDescription")}
        </p>
      </div>
      <form className="flex flex-col gap-6" onSubmit={handleSubmitWithAction}>
        <FormInput
          disabled={action.isPending}
          form={form}
          label={t("form.serviceName")}
          name="name"
          placeholder={t("form.serviceNamePlaceholder")}
          tValidation={tValidation}
        />
        <FormInput
          as={Textarea}
          disabled={action.isPending}
          form={form}
          label={t("form.serviceDescription")}
          name="description"
          placeholder={t("form.serviceDescriptionPlaceholder")}
          tValidation={tValidation}
        />
        <FormInput
          className="text-right"
          disabled={action.isPending}
          form={form}
          formatValue={(v: unknown) => formatToIDR(Number(v))}
          label={t("form.servicePrice")}
          name="price"
          parseValue={(v: string) => Number(v.replace(/[^0-9]/g, ""))}
          placeholder={t("form.servicePricePlaceholder")}
          tValidation={tValidation}
        />
        <FormInput
          accept="image/jpeg,image/png,.jpg,.jpeg,.png"
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
                <Field
                  data-invalid={fieldState.invalid}
                  orientation="horizontal"
                >
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
        <Button disabled={action.isPending} type="submit">
          {t("form.addService")}
        </Button>
      </form>
    </div>
  );
};

export default NewServicePage;
