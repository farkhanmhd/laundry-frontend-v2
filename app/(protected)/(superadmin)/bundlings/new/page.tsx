"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useRouter } from "next/navigation";
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
import { addInventoryAction } from "../actions";
import { addInventorySchema, units } from "../schema";

const NewInventoryPage = () => {
  const { push } = useRouter();
  const { form, handleSubmitWithAction, action } = useHookFormAction(
    addInventoryAction,
    zodResolver(addInventorySchema),
    {
      formProps: {
        mode: "onChange",
      },
      actionProps: {
        onSettled: ({ result: { data } }) => {
          if (data?.status === "success") {
            toast.success(data.message);
            push("/inventories");
          }
        },
      },
    }
  );

  return (
    <div className="h-full space-y-4 p-6 lg:mx-auto lg:max-w-3xl">
      <div>
        <h1 className="font-semibold text-2xl">Create New Inventory</h1>
        <p className="text-muted-foreground text-sm">
          Enter details below to add new inventory.
        </p>
      </div>
      <form className="flex flex-col gap-6" onSubmit={handleSubmitWithAction}>
        <FormInput
          disabled={action.isPending}
          form={form}
          label="Inventory Name"
          name="name"
          placeholder="Sabun Cair"
        />
        <FormInput
          as={Textarea}
          disabled={action.isPending}
          form={form}
          label="Inventory Description"
          name="description"
          placeholder="Inventory description"
        />
        <div className="flex w-full flex-col gap-6 md:flex-row">
          <FormInput
            className="text-right"
            disabled={action.isPending}
            form={form}
            label="Inventory Price (IDR)"
            name="price"
            placeholder="10000"
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
        <div className="flex w-full flex-col gap-6 md:flex-row">
          <FormInput
            disabled={action.isPending}
            form={form}
            label="Quantity of Inventory"
            name="stock"
            placeholder="Quantity"
          />
          <FormInput
            disabled={action.isPending}
            form={form}
            label="Safety Stock Quantity of Inventory"
            name="safetyStock"
            placeholder="Safety Stock Quantity"
          />
        </div>
        <FormInput
          accept="image/jpeg,image/png,.jpg,.jpeg,.png"
          form={form}
          label="Image"
          name="image"
          type="file"
        />
        <Button disabled={action.isPending} type="submit">
          Add Inventory
        </Button>
      </form>
    </div>
  );
};

export default NewInventoryPage;
