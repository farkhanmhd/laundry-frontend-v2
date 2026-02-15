"use client";

import type { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Controller, useWatch } from "react-hook-form";
import { DateTimePicker } from "@/components/forms/date-time-picker";
import { FormInput } from "@/components/forms/form-input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type UseHookFormActionResult = ReturnType<typeof useHookFormAction>;

const voucherTypes = ["fixed", "percentage"];

type Props = {
  submitLabel: string;
  formData: UseHookFormActionResult;
  onSubmitVoucherAction: (e: React.FormEvent) => void;
};

export const VoucherDataForm = ({
  submitLabel = "",
  onSubmitVoucherAction,
  formData,
}: Props) => {
  const t = useTranslations("Vouchers");
  const { action, form } = formData;
  const discountPercentage: number = useWatch({
    control: form.control,
    name: "discountPercentage",
  });
  const [voucherType, setVoucherType] = useState(
    Number(discountPercentage) > 0 ? "percentage" : "fixed"
  );

  const handleVoucherTypeChange = (value: string) => {
    setVoucherType(value);
    if (value === "percentage") {
      form.setValue("discountAmount", null);
    } else if (value === "fixed") {
      form.setValue("discountPercentage", null);
      form.setValue("maxDiscountAmount", null);
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmitVoucherAction}>
      <FormInput
        disabled={action.isPending}
        form={form}
        label={t("form.voucherCode")}
        name="code"
        placeholder="Voucher Code"
      />

      <FormInput
        as={Textarea}
        disabled={action.isPending}
        form={form}
        label={t("form.voucherDescription")}
        name="description"
        placeholder="Voucher Description"
      />

      <FormInput
        disabled={action.isPending}
        form={form}
        label={t("form.minSpend")}
        name="minSpend"
        placeholder="Minimum Spend"
      />

      <div className="space-y-3">
        <Label className="text-base">{t("form.voucherType")}</Label>
        <Select onValueChange={handleVoucherTypeChange} value={voucherType}>
          <SelectTrigger className="mb-0 w-full capitalize">
            <SelectValue placeholder={t("form.selectVoucherType")} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{t("form.voucherType")}</SelectLabel>
              {voucherTypes.map((type) => (
                <SelectItem className="capitalize" key={type} value={type}>
                  {t(`form.${type}`)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {voucherType === "fixed" ? (
        <FormInput
          disabled={action.isPending}
          form={form}
          label={t("form.discountAmount")}
          name="discountAmount"
          placeholder="Discount Amount"
        />
      ) : (
        <>
          <FormInput
            disabled={action.isPending}
            form={form}
            label={t("form.discountPercentage")}
            name="discountPercentage"
            placeholder="Discount Percentage (%)"
          />
          <FormInput
            disabled={action.isPending}
            form={form}
            label={t("form.maxDiscountAmount")}
            name="maxDiscountAmount"
            placeholder="Maximum Discount Amount"
          />
        </>
      )}

      <FieldGroup>
        <Controller
          control={form.control}
          name="expiresAt"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="text-base" htmlFor={field.name}>
                {t("form.expiryDate")}
              </FieldLabel>
              <DateTimePicker date={field.value} onChange={field.onChange} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <FieldGroup>
        <Controller
          control={form.control}
          name="isVisible"
          render={({ field, fieldState }) => (
            <FieldLabel>
              <Field data-invalid={fieldState.invalid} orientation="horizontal">
                <Checkbox
                  checked={field.value}
                  id={field.name}
                  name={field.name}
                  onCheckedChange={field.onChange}
                />
                <FieldContent>
                  <FieldTitle>{t("form.showVoucher")}</FieldTitle>
                  <FieldDescription>
                    {t("form.showVoucherDescription")}
                  </FieldDescription>
                </FieldContent>
              </Field>
            </FieldLabel>
          )}
        />
      </FieldGroup>

      <Button disabled={action.isPending} type="submit">
        {submitLabel}
      </Button>
    </form>
  );
};
