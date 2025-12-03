"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import { FormInput } from "@/components/forms/form-input";
import type { SelectOption } from "@/components/forms/form-select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { addBundlingAction } from "../actions";
import { BundlingItemForm } from "../components/bundling-item-form";
import { type AddBundlingSchema, addBundlingSchema } from "../schema";

type Props = {
  services: SelectOption[];
  inventories: SelectOption[];
};

export const NewBundlingForm = ({ services, inventories }: Props) => {
  const { push } = useRouter();
  const { form, action } = useHookFormAction(
    addBundlingAction,
    zodResolver(addBundlingSchema),
    {
      formProps: {
        mode: "onChange",
        defaultValues: {
          name: "",
          description: "",
          price: 0,
          items: [
            {
              quantity: 0,
            },
          ],
        },
      },
      actionProps: {
        onSettled: ({ result: { data } }) => {
          if (data?.status === "success") {
            toast.success(data.message);
            push("/bundlings");
          }
        },
      },
    }
  );

  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: "items",
    keyName: "_id",
  });

  const canAddMore = fields.length < 10;

  const onSubmit = (data: AddBundlingSchema) => {
    action.execute(data);
  };

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FormInput
        disabled={action.isPending || !form.formState.isDirty}
        form={form}
        label="Bundlings Name"
        name="name"
        placeholder="Sabun Cair"
      />
      <FormInput
        as={Textarea}
        disabled={action.isPending || !form.formState.isDirty}
        form={form}
        label="Bundlings Description"
        name="description"
        placeholder="Bundlings description"
      />
      <FormInput
        className="text-right"
        disabled={action.isPending || !form.formState.isDirty}
        form={form}
        label="Bundlings Price (IDR)"
        name="price"
        placeholder="10000"
      />
      <FormInput
        accept="image/jpeg,image/png,.jpg,.jpeg,.png"
        disabled={action.isPending || !form.formState.isDirty}
        form={form}
        label="Image"
        name="image"
        type="file"
      />

      <div className="flex flex-col gap-6">
        <p className="font-medium">Bundling Items</p>
        <div className="flex flex-col gap-6">
          {fields.map((field, index) => (
            <BundlingItemForm
              disabled={action.isPending || !form.formState.isDirty}
              field={field}
              index={index}
              inventories={inventories}
              key={field._id}
              onDeleteClick={() => remove(index)}
              removable={fields.length > 1}
              services={services}
              update={update}
            />
          ))}
        </div>
        {canAddMore && (
          <Button
            disabled={action.isPending || !form.formState.isDirty}
            onClick={() => append({ itemType: "inventory", quantity: 0 })}
            type="button"
            variant="outline"
          >
            <Plus />
            <span>Add Item</span>
          </Button>
        )}
      </div>

      <Button
        disabled={action.isPending || !form.formState.isDirty}
        type="submit"
      >
        Add Bundlings
      </Button>
    </form>
  );
};
