"use client";

import type { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useTranslations } from "next-intl";
import { FormInput } from "@/components/forms/form-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DriverSearch } from "./driver-search";

type UseHookFormActionResult = ReturnType<typeof useHookFormAction>;

type Props = {
  formData: UseHookFormActionResult;
  onSubmitVehicleAction: (e: React.SubmitEvent) => void;
  submitLabel: string;
  initialDriverName?: string | null;
};

export const VehicleDataForm = ({
  formData,
  onSubmitVehicleAction,
  submitLabel,
  initialDriverName,
}: Props) => {
  const t = useTranslations("Vehicles");
  const tValidation = useTranslations("Validation");
  const { action, form } = formData;

  return (
    <form onSubmit={onSubmitVehicleAction}>
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
        <div className="flex flex-col gap-3">
          <Label className="text-base">Driver</Label>
          <DriverSearch form={form} initialDriverName={initialDriverName} />
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <Button disabled={action.isPending} type="submit">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};
