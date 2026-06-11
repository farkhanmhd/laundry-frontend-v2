"use client";

import { CalendarIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cardShadowStyle } from "@/lib/utils";

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !Number.isNaN(date.getTime());
}

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
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState<Date | undefined>(date);
  const [value, setValue] = useState(formatDate(date));

  return (
    <Field className="my-6">
      <FieldLabel htmlFor="date-picker-optional">{label ?? t("date")}</FieldLabel>
      <InputGroup style={cardShadowStyle}>
        <InputGroupInput
          id="date-picker-optional"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const parsed = new Date(e.target.value);
            setValue(e.target.value);
            if (isValidDate(parsed)) {
              onDateChange(parsed);
              setMonth(parsed);
            }
          }}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
          placeholder={t("selectDate")}
          value={value}
        />
        <InputGroupAddon align="inline-end">
          <Popover onOpenChange={setOpen} open={open}>
            <PopoverTrigger asChild>
              <InputGroupButton
                aria-label="Select date"
                id="date-picker"
                size="icon-sm"
                variant="ghost"
              >
                <CalendarIcon />
                <span className="sr-only">Select date</span>
              </InputGroupButton>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              alignOffset={-8}
              className="w-auto overflow-hidden p-0"
              sideOffset={10}
            >
              <Calendar
                disabled={(day) =>
                  day < new Date(new Date().setHours(0, 0, 0, 0))
                }
                mode="single"
                month={month}
                onMonthChange={setMonth}
                onSelect={(selectedDate) => {
                  onDateChange(selectedDate);
                  setValue(formatDate(selectedDate));
                  setOpen(false);
                }}
                selected={date}
              />
            </PopoverContent>
          </Popover>
        </InputGroupAddon>
      </InputGroup>
      {error && <FieldError>{error}</FieldError>}
    </Field>
  );
}
