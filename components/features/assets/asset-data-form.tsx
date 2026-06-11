"use client";

import type { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useTranslations } from "next-intl";
import { FormInput } from "@/components/forms/form-input";
import { Button } from "@/components/ui/button";

type UseHookFormActionResult = ReturnType<typeof useHookFormAction>;

type Props = {
  formData: UseHookFormActionResult;
  onSubmitAssetAction: (e: React.SubmitEvent) => void;
  submitLabel: string;
};

export const AssetDataForm = ({
  formData,
  onSubmitAssetAction,
  submitLabel,
}: Props) => {
  const t = useTranslations("Assets");
  const tValidation = useTranslations("Validation");
  const { action, form } = formData;

  return (
    <form onSubmit={onSubmitAssetAction}>
      <div className="space-y-4">
        <FormInput
          disabled={action.isPending}
          form={form}
          label={t("form.name")}
          name="name"
          placeholder={t("form.namePlaceholder")}
          tValidation={tValidation}
        />
        <FormInput
          disabled={action.isPending}
          form={form}
          label={t("form.licensePlate")}
          name="licensePlate"
          placeholder={t("form.licensePlatePlaceholder")}
          tValidation={tValidation}
        />
      </div>
      <div className="mt-6 flex justify-end">
        <Button disabled={action.isPending} type="submit">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};
