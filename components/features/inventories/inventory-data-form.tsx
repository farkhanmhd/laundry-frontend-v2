"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";
import { FormInput } from "@/components/forms/form-input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { updateInventoryAction } from "@/lib/modules/inventories/actions";
import {
  type UpdateInventorySchema,
  updateInventorySchema,
} from "@/lib/modules/inventories/schema";

export const InventoryDataForm = ({
  id,
  name,
  description,
  price,
  safetyStock,
}: UpdateInventorySchema) => {
  const t = useTranslations("Inventories");
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
    form.reset({
      name,
      description,
      price,
      safetyStock,
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-semibold text-xl">{t("form.inventoryData")}</h2>
        <p className="text-muted-foreground text-sm">
          {t("form.inventoryDataDescription")}
        </p>
      </div>
      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        <FormInput
          defaultValue={name}
          disabled={!isEditing || action.isPending}
          form={form}
          label={t("form.inventoryName")}
          name="name"
          placeholder="Sabun Cair"
        />
        <FormInput
          as={Textarea}
          defaultValue={description}
          disabled={!isEditing || action.isPending}
          form={form}
          label={t("form.inventoryDescription")}
          name="description"
          placeholder="Inventory description"
        />
        <FormInput
          className="text-right"
          defaultValue={price}
          disabled={!isEditing || action.isPending}
          form={form}
          label={t("form.inventoryPrice")}
          name="price"
          placeholder="10000"
        />
        <div className="flex flex-col gap-6 md:flex-row">
          <FormInput
            defaultValue={safetyStock}
            disabled={!isEditing || action.isPending}
            form={form}
            label={t("form.safetyStockLabel")}
            name="safetyStock"
            placeholder="Safety Stock"
          />
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
                {t("form.cancel")}
              </Button>
              <Button
                disabled={action.isPending || !form.formState.isDirty}
                type="submit"
              >
                {t("form.saveChanges")}
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} type="button">
              {t("form.edit")}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
