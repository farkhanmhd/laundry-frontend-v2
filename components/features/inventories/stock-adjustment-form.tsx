"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";
import { FormInput } from "@/components/forms/form-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { adjustQuantityAction } from "@/lib/modules/inventories/actions";
import {
  type AdjustQuantitySchema,
  adjustQuantitySchema,
  allowedAdjustType,
} from "@/lib/modules/inventories/schema";

type Props = {
  id: string;
  currentQuantity: number;
};

export const StockAdjustmentForm = ({ id, currentQuantity }: Props) => {
  const t = useTranslations("Inventories");
  const [isEditing, setIsEditing] = useState(false);

  const defaultValues: AdjustQuantitySchema = {
    id,
    currentQuantity,
    note: "",
    type: "adjustment",
    changeAmount: 0,
  };

  const { form, action } = useHookFormAction(
    adjustQuantityAction,
    zodResolver(adjustQuantitySchema),
    {
      formProps: {
        mode: "onChange",
      },
      actionProps: {
        onSettled: ({ result: { data } }) => {
          if (data?.status === "success") {
            toast.success(data.message);
            const changeAmount = Number(form.getValues("changeAmount"));

            form.reset({
              id,
              currentQuantity: currentQuantity + changeAmount,
              changeAmount: 0,
              note: "",
            });
            setIsEditing(false);
          }
        },
      },
    }
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData: AdjustQuantitySchema = {
      id,
      currentQuantity,
      changeAmount: Number(form.watch("changeAmount")),
      note: form.watch("note"),
      type: form.watch("type"),
    };
    action.execute(formData);
  };

  const handleCancel = () => {
    form.reset(defaultValues);
    setIsEditing(false);
  };

  const handleTypeChange = (value: string) => {
    form.setValue("type", value as AdjustQuantitySchema["type"]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-semibold text-xl">{t("stockForm.title")}</h2>
        <p className="text-muted-foreground text-sm">
          {t("stockForm.description")}
        </p>
      </div>

      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        {/* Current quantity is always disabled, but reactive */}
        <div className="flex gap-6">
          <FormInput
            disabled
            form={form}
            label={t("stockForm.currentQuantity")}
            name="currentQuantity"
            placeholder={t("stockForm.currentQuantityPlaceholder")}
            value={currentQuantity}
          />

          <FormInput
            disabled={!isEditing || action.isPending}
            form={form}
            inputMode="numeric"
            label={t("stockForm.changeAmount")}
            name="changeAmount"
            placeholder={t("stockForm.changeAmountPlaceholder")}
          />
        </div>

        <div className="space-y-4">
          <Label htmlFor="type">{t("stockForm.adjustmentType")}</Label>
          <Select onValueChange={handleTypeChange} value={form.watch("type")}>
            <SelectTrigger
              className="w-full capitalize"
              disabled={!isEditing || action.isPending}
              id="type"
            >
              <SelectValue placeholder={t("stockForm.selectType")} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {allowedAdjustType.map((val) => (
                  <SelectItem className="capitalize" key={val} value={val}>
                    {val}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <FormInput
          as={Textarea}
          disabled={!isEditing || action.isPending}
          form={form}
          label={t("stockForm.reasonLabel")}
          name="note"
          placeholder={t("stockForm.reasonPlaceholder")}
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
