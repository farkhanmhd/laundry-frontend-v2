"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import { BundlingItemForm } from "@/components/features/bundlings/bundling-item-form";
import { FormInput } from "@/components/forms/form-input";
import type { SelectOption } from "@/components/forms/form-select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { addBundlingAction } from "@/lib/modules/bundlings/actions";
import {
  type AddBundlingSchema,
  addBundlingSchema,
} from "@/lib/modules/bundlings/schema";

type Props = {
  services: SelectOption[];
  inventories: SelectOption[];
};

export const NewBundlingForm = ({ services, inventories }: Props) => {
  const t = useTranslations("Bundlings");
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
    console.log(data);
    action.execute(data);
  };

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FormInput
        disabled={action.isPending}
        form={form}
        label={t("form.bundlingName")}
        name="name"
        placeholder="Paket Cuci"
      />
      <FormInput
        as={Textarea}
        disabled={action.isPending}
        form={form}
        label={t("form.bundlingDescription")}
        name="description"
        placeholder="Bundlings description"
      />
      <FormInput
        className="text-right"
        disabled={action.isPending}
        form={form}
        label={t("form.bundlingPrice")}
        name="price"
        placeholder="10000"
      />
      <FormInput
        accept="image/jpeg,image/png,.jpg,.jpeg,.png"
        disabled={action.isPending}
        form={form}
        label={t("form.image")}
        name="image"
        type="file"
      />

      <div className="flex flex-col gap-6">
        <p className="font-medium">{t("itemsForm.bundlingItems")}</p>
        <div className="flex flex-col gap-6">
          {fields.map((field, index) => (
            <BundlingItemForm
              disabled={action.isPending}
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
            disabled={action.isPending}
            onClick={() => append({ itemType: "inventory", quantity: 0 })}
            type="button"
            variant="outline"
          >
            <Plus />
            <span>{t("itemsForm.addItem")}</span>
          </Button>
        )}
      </div>

      <Button disabled={action.isPending} type="submit">
        {t("form.createNew")}
      </Button>
    </form>
  );
};
