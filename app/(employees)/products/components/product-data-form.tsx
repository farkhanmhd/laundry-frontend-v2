"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useState } from "react";
import { toast } from "sonner";
import { FormInput } from "@/components/forms/form-input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { updateProductAction } from "../actions";
import { type UpdateProductSchema, updateProductSchema } from "../schema";

export const ProductDataForm = ({
  id,
  name,
  description,
  price,
  reorderPoint,
}: UpdateProductSchema) => {
  // 🔹 local edit mode toggle
  const [isEditing, setIsEditing] = useState(false);

  const { form, action } = useHookFormAction(
    updateProductAction,
    zodResolver(updateProductSchema),
    {
      formProps: {
        mode: "onChange",
        values: {
          name,
          description,
          price,
          reorderPoint,
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
    const formData: UpdateProductSchema = {
      id,
      name: form.getValues("name"),
      description: form.getValues("description"),
      price: Number(form.getValues("price")),
      reorderPoint: Number(form.getValues("reorderPoint")),
    };
    action.execute(formData);
  };

  const handleCancel = () => {
    form.reset({ name, description, price, reorderPoint }); // reset to original data
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-semibold text-xl">Product Data</h2>
        <p className="text-muted-foreground text-sm">
          Review and modify key product details such as name, description,
          price, and reorder point.
        </p>
      </div>
      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        <FormInput
          defaultValue={name}
          disabled={!isEditing || action.isPending}
          form={form}
          label="Product Name"
          name="name"
          placeholder="Sabun Cair"
        />
        <FormInput
          as={Textarea}
          defaultValue={description}
          disabled={!isEditing || action.isPending}
          form={form}
          label="Product Description"
          name="description"
          placeholder="Product description"
        />
        <FormInput
          defaultValue={price}
          disabled={!isEditing || action.isPending}
          form={form}
          label="Product Price"
          name="price"
          placeholder="10000"
        />
        <FormInput
          defaultValue={reorderPoint}
          disabled={!isEditing || action.isPending}
          form={form}
          label="Reorder Point of Product"
          name="reorderPoint"
          placeholder="Reorder Point"
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
