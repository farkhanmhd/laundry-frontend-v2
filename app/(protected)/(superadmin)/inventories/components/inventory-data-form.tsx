"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useState } from "react";
import { toast } from "sonner";
import { FormInput } from "@/components/forms/form-input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { updateInventoryAction } from "../actions";
import { type UpdateInventorySchema, updateInventorySchema } from "../schema";

export const InventoryDataForm = ({
  id,
  name,
  description,
  price,
  safetyStock,
}: UpdateInventorySchema) => {
  // 🔹 local edit mode toggle
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
      price: Number(form.getValues("price")),
      safetyStock: Number(form.getValues("safetyStock")),
    };
    action.execute(formData);
  };

  const handleCancel = () => {
    form.reset({ name, description, price, safetyStock }); // reset to original data
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
        <FormInput
          defaultValue={safetyStock}
          disabled={!isEditing || action.isPending}
          form={form}
          label="Safety Stock of Inventory"
          name="safetyStock"
          placeholder="Safety Stock"
        />

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
