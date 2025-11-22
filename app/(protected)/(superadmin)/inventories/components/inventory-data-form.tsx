"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { toast } from "sonner";
import { FormInput } from "@/components/forms/form-input";
import { FormSelect } from "@/components/forms/form-select";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { updateInventoryAction } from "../actions";
import {
  type UpdateInventorySchema,
  units,
  updateInventorySchema,
} from "../schema";

export const InventoryDataForm = ({
  id,
  name,
  description,
  price,
  unit,
  safetyStock,
}: UpdateInventorySchema) => {
  const [isEditing, setIsEditing] = useState(false);

  const { form, action } = useHookFormAction(
    updateInventoryAction,
    zodResolver(updateInventorySchema),
    {
      formProps: {
        mode: "onChange",
        values: {
          name,
          description,
          price,
          safetyStock,
          unit,
          id,
        },
      },
      actionProps: {
        onSettled: ({ result: { data } }) => {
          if (data?.status === "success") {
            toast.success(data.message);
            setIsEditing(false); // exit edit mode after successful save
          }
        },
      },
    }
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData: UpdateInventorySchema = {
      id,
      name: form.getValues("name"),
      description: form.getValues("description"),
      unit: form.getValues("unit"),
      price: Number(form.getValues("price")),
      safetyStock: Number(form.getValues("safetyStock")),
    };

    action.execute(formData);
  };

  const handleCancel = () => {
    form.reset({ name, description, price, safetyStock });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-semibold text-xl">Inventory Data</h2>
        <p className="text-muted-foreground text-sm">
          Review and modify key Inventory details such as name, description,
          price, and reorder point.
        </p>
      </div>
      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        <FormInput
          defaultValue={name}
          disabled={!isEditing || action.isPending}
          form={form}
          label="Inventory Name"
          name="name"
          placeholder="Sabun Cair"
        />
        <FormInput
          as={Textarea}
          defaultValue={description}
          disabled={!isEditing || action.isPending}
          form={form}
          label="Inventory Description"
          name="description"
          placeholder="Inventory description"
        />
        <FormInput
          defaultValue={price}
          disabled={!isEditing || action.isPending}
          form={form}
          label="Inventory Price"
          name="price"
          placeholder="10000"
        />
        <div className="flex flex-col gap-6 md:flex-row">
          <FormInput
            defaultValue={safetyStock}
            disabled={!isEditing || action.isPending}
            form={form}
            label="Safety Stock of Inventory"
            name="safetyStock"
            placeholder="Safety Stock"
          />
          <FieldGroup>
            <Controller
              control={form.control}
              name="unit"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-base" htmlFor={field.name}>
                    Unit
                  </FieldLabel>
                  <FormSelect
                    aria-invalid={fieldState.invalid}
                    disabled={!isEditing || action.isPending}
                    id={field.name}
                    onValueChange={field.onChange}
                    options={units}
                    value={field.value}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </div>

        <div className="flex justify-end gap-3">
          {isEditing ? (
            <>
              <Button
                disabled={action.isPending}
                onClick={handleCancel}
                type="button"
                variant="ghost"
              >
                Cancel
              </Button>
              <Button
                disabled={action.isPending || !form.formState.isDirty}
                type="submit"
              >
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} type="button">
              Edit
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
