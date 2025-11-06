import React from "react";
import { Controller, Path, UseFormReturn } from "react-hook-form";
import { FieldGroup, Field, FieldLabel, FieldError } from "../ui/field";
import { Input } from "../ui/input";

type InputField = Record<string, unknown>;
type ElementType = React.ElementType;

export type FormInputProps<TFieldValues extends InputField, InputType extends ElementType = typeof Input> = {
  form: UseFormReturn<TFieldValues>;
  label: string;
  name: Path<TFieldValues>;
  as?: InputType;
} & Omit<React.ComponentProps<InputType>, "form" | "name">;

export function FormInput<TFieldValues extends InputField, InputType extends ElementType>({ form, label, name, as, ...props }: FormInputProps<TFieldValues, InputType>) {
  const Component = as ?? Input;

  return (
    <FieldGroup>
      <Controller
        control={form.control}
        name={name}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel className='text-base' htmlFor={field.name}>
              {label}
            </FieldLabel>
            <Component aria-invalid={fieldState.invalid} autoComplete='off' className='text-sm' id={field.name} {...props} {...form.register(name)} />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
}
