import type React from "react";
import { Controller, type Path, type UseFormReturn } from "react-hook-form";
import { translateZodError } from "@/lib/translate-zod-error";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

type InputField = Record<string, unknown>;
type ElementType = React.ElementType;

export type FormInputProps<
  TFieldValues extends InputField,
  InputType extends ElementType = typeof Input,
> = {
  form: UseFormReturn<TFieldValues>;
  label?: string;
  name: Path<TFieldValues>;
  as?: InputType;
  defaultValue?: TFieldValues[Path<TFieldValues>];
  showErrors?: boolean;
  formatValue?: (value: unknown) => string;
  parseValue?: (displayValue: string) => unknown;
  tValidation?: (key: string) => string;
} & Omit<React.ComponentProps<InputType>, "form" | "name" | "defaultValue">;

export function FormInput<
  TFieldValues extends InputField,
  InputType extends ElementType,
>({
  form,
  label,
  name,
  as,
  showErrors = true,
  formatValue,
  parseValue,
  defaultValue,
  tValidation,
  ...props
}: FormInputProps<TFieldValues, InputType>) {
  const Component = as ?? Input;
  const isFileInput = "type" in props && props.type === "file";

  return (
    <FieldGroup>
      <Controller
        control={form.control}
        name={name}
        render={({ field, fieldState }) => {
          const currentValue = field.value ?? ("" as unknown);
          const displayValue = formatValue
            ? formatValue(currentValue)
            : String(currentValue ?? "");

          const translatedError =
            tValidation && fieldState.error?.message
              ? {
                  ...fieldState.error,
                  message: translateZodError(
                    fieldState.error.message,
                    tValidation
                  ),
                }
              : fieldState.error;

          return (
            <Field data-invalid={fieldState.invalid}>
              {label && (
                <FieldLabel className="text-base" htmlFor={field.name}>
                  {label}
                </FieldLabel>
              )}
              <Component
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                className="text-sm"
                id={field.name}
                {...props}
                {...(isFileInput ? {} : { value: displayValue })}
                name={field.name}
                onBlur={field.onBlur}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (isFileInput) {
                    const file = e.target.files?.[0];
                    (
                      props.onChange as React.ChangeEventHandler<HTMLInputElement>
                    )?.(e);
                    if (!e.defaultPrevented) {
                      field.onChange(file);
                    }
                  } else {
                    const raw = e.target.value;
                    field.onChange(parseValue ? parseValue(raw) : raw);
                  }
                }}
                ref={field.ref}
              />
              {showErrors && fieldState.invalid && (
                <FieldError errors={[translatedError]} />
              )}
            </Field>
          );
        }}
      />
    </FieldGroup>
  );
}
