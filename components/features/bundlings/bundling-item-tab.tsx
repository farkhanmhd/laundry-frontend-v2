"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import type { SelectOption } from "@/components/forms/form-select";
import { Button } from "@/components/ui/button";
import { updateBundlingItemsAction } from "@/lib/modules/bundlings/actions";
import {
  type BundlingItem,
  type UpdateBundlingItemSchema,
  updateBundlingItemsSchema,
} from "@/lib/modules/bundlings/schema";
import { BundlingItemForm } from "./bundling-item-form";

type Props = {
  bundlingId: string;
  inventories: SelectOption[];
  services: SelectOption[];
  items: BundlingItem[];
};

export const BundlingItemTab = ({
  bundlingId,
  inventories,
  services,
  items,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const { form, action } = useHookFormAction(
    updateBundlingItemsAction,
    zodResolver(updateBundlingItemsSchema),
    {
      formProps: {
        defaultValues: {
          id: bundlingId,
          items,
        },
      },
      actionProps: {
        onSettled: ({ result: { data } }) => {
          if (data?.status === "success") {
            toast.success(data.message);
            form.reset(form.control._formValues);
          } else {
            toast.error(data?.message);
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

  const onSubmit = (data: UpdateBundlingItemSchema) => {
    action.execute(data);
  };

  return (
    <div className="flex flex-col gap-6">
      <p className="font-medium">Bundling Items</p>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-6">
          {fields.map((field, index) => (
            <BundlingItemForm
              disabled={action.isPending || !isEditing}
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
        {canAddMore && isEditing && (
          <Button
            disabled={action.isPending || !isEditing}
            onClick={() => append({ itemType: "inventory", quantity: 0 })}
            type="button"
            variant="outline"
          >
            <Plus />
            <span>Add Item</span>
          </Button>
        )}
        {isEditing ? (
          <div className="flex items-center gap-2 self-end">
            <Button
              onClick={() => {
                setIsEditing(false);
                form.reset();
              }}
              type="button"
              variant="ghost"
            >
              Cancel
            </Button>
            <Button className="w-max" disabled={action.isPending} type="submit">
              Update Bundlings
            </Button>
          </div>
        ) : (
          <Button
            className="self-end"
            onClick={() => setIsEditing(true)}
            type="button"
          >
            Edit
          </Button>
        )}
      </form>
    </div>
  );
};
