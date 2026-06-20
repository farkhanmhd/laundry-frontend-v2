"use client";

import { useTranslations } from "next-intl";
import { DateTimePicker } from "@/components/forms/date-time-picker";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { cardShadowStyle } from "@/lib/utils";

interface CustomerOrderDateTimePickerProps {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  error?: string;
  label?: string;
}

export function CustomerOrderDateTimePicker({
  date,
  onDateChange,
  error,
  label,
}: CustomerOrderDateTimePickerProps) {
  const t = useTranslations("CustomerOrders.orderSummary");

  return (
    <Field className="my-6" data-invalid={!!error}>
      <FieldLabel htmlFor="date-picker-optional">
        {label ?? t("date")}
      </FieldLabel>
      <DateTimePicker
        date={date}
        disablePast
        id="date-picker-optional"
        onChange={onDateChange}
        style={cardShadowStyle}
      />
      {error && <FieldError>{error}</FieldError>}
    </Field>
  );
}
