"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useState } from "react";
import { toast } from "sonner";
import { FormInput } from "@/components/forms/form-input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { updateBundlingAction } from "../actions";
import { type UpdateBundlingSchema, updateBundlingSchema } from "../schema";

export const BundlingDataForm = ({
  id,
  name,
  description,
  price,
}: UpdateBundlingSchema) => {
  const [isEditing, setIsEditing] = useState(false);

  const { form, action } = useHookFormAction(
    updateBundlingAction,
    zodResolver(updateBundlingSchema),
    {
      formProps: {
        mode: "onChange",
        values: {
          name,
          description,
          price,
          id,
        },
      },
      actionProps: {
        onSettled: ({ result: { data } }) => {
          if (data?.status === "success") {
            toast.success(data.message);
            setIsEditing(false);
            form.reset(form.control._formValues);
          }
        },
      },
    }
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData: UpdateBundlingSchema = {
      id,
      name: form.getValues("name"),
      description: form.getValues("description"),
      price: Number(form.getValues("price")),
    };

    action.execute(formData);
  };

  const handleCancel = () => {
    form.reset({ name, description, price });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-semibold text-xl">Inventory Data</h2>
        <p className="text-muted-foreground text-sm">
          Review and modify key Bundling details such as name, description,
          price.
        </p>
      </div>
      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        <FormInput
          defaultValue={name}
          disabled={!isEditing || action.isPending}
          form={form}
          label="Bundling Name"
          name="name"
          placeholder="Paket Cuci Kering Lipat"
        />
        <FormInput
          as={Textarea}
          defaultValue={description}
          disabled={!isEditing || action.isPending}
          form={form}
          label="Bundling Description"
          name="description"
          placeholder="Inventory description"
        />
        <FormInput
          className="text-right"
          defaultValue={price}
          disabled={!isEditing || action.isPending}
          form={form}
          label="Bundling Price (IDR)"
          name="price"
          placeholder="10000"
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
