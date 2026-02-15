"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";
import { FormInput } from "@/components/forms/form-input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { updateBundlingAction } from "@/lib/modules/bundlings/actions";
import {
  type UpdateBundlingSchema,
  updateBundlingSchema,
} from "@/lib/modules/bundlings/schema";

export const BundlingDataForm = ({
  id,
  name,
  description,
  price,
}: UpdateBundlingSchema) => {
  const t = useTranslations("Bundlings");
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
        <h2 className="font-semibold text-xl">{t("form.bundlingData")}</h2>
        <p className="text-muted-foreground text-sm">
          {t("form.bundlingDataDescription")}
        </p>
      </div>
      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        <FormInput
          defaultValue={name}
          disabled={!isEditing || action.isPending}
          form={form}
          label={t("form.bundlingName")}
          name="name"
          placeholder="Paket Cuci Kering Lipat"
        />
        <FormInput
          as={Textarea}
          defaultValue={description}
          disabled={!isEditing || action.isPending}
          form={form}
          label={t("form.bundlingDescription")}
          name="description"
          placeholder="Bundling description"
        />
        <FormInput
          className="text-right"
          defaultValue={price}
          disabled={!isEditing || action.isPending}
          form={form}
          label={t("form.bundlingPrice")}
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
