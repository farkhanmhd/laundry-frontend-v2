import type React from "react";
import { Controller, type Path, type UseFormReturn } from "react-hook-form";
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
  ...props
}: FormInputProps<TFieldValues, InputType>) {
  const Component = as ?? Input;

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
                value={displayValue}
                onChange={(e) => {
                  const raw = e.target.value;
                  field.onChange(parseValue ? parseValue(raw) : raw);
                }}
                onBlur={field.onBlur}
                ref={field.ref}
                name={field.name}
              />
              {showErrors && fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          );
        }}
      />
    </FieldGroup>
  );
}
