"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
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
        <h2 className="font-semibold text-xl">Stock Adjustment</h2>
        <p className="text-muted-foreground text-sm">
          Adjust the stock quantity of the inventory when necessary. Use this
          form to record inventory corrections or manual updates.
        </p>
      </div>

      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        {/* Current quantity is always disabled, but reactive */}
        <div className="flex gap-6">
          <FormInput
            disabled
            form={form}
            label="Current Quantity"
            name="currentQuantity"
            placeholder="Current quantity in stock"
            value={currentQuantity}
          />

          <FormInput
            disabled={!isEditing || action.isPending}
            form={form}
            inputMode="numeric"
            label="Change Amount"
            name="changeAmount"
            placeholder="Decrease (-1) or Increase (6)"
          />
        </div>

        <div className="space-y-4">
          <Label htmlFor="type">Adjustment Type</Label>
          <Select onValueChange={handleTypeChange} value={form.watch("type")}>
            <SelectTrigger
              className="w-full capitalize"
              disabled={!isEditing || action.isPending}
              id="type"
            >
              <SelectValue placeholder="Select adjustment Type" />
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
          label="Reason for Adjustment"
          name="note"
          placeholder="e.g. Damaged items removed, manual count correction, etc."
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
