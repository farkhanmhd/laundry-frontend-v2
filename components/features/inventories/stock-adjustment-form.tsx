"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useState } from "react";
import { toast } from "sonner";
import { FormInput } from "@/components/forms/form-input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { adjustQuantityAction } from "@/lib/modules/inventories/actions";
import {
  type AdjustQuantitySchema,
  adjustQuantitySchema,
} from "@/lib/modules/inventories/schema";

type Props = {
  id: string;
  currentQuantity: number;
};

export const StockAdjustmentForm = ({ id, currentQuantity }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  // ✅ current quantity is now stateful
  const [currentQty, setCurrentQty] = useState(currentQuantity);

  const { form, action } = useHookFormAction(
    adjustQuantityAction,
    zodResolver(adjustQuantitySchema),
    {
      formProps: {
        mode: "onChange",
        defaultValues: {
          id,
          currentQuantity: currentQty,
          newQuantity: currentQty,
          reason: "",
        },
      },
      actionProps: {
        onSettled: ({ result: { data } }) => {
          if (data?.status === "success") {
            toast.success(data.message);
            const newQty = Number(form.getValues("newQuantity"));
            setCurrentQty(newQty); // ✅ update the state after successful save
            form.reset({
              id,
              currentQuantity: newQty,
              newQuantity: newQty,
              reason: "",
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
      currentQuantity: Number(currentQty),
      newQuantity: Number(form.getValues("newQuantity")),
      reason: form.getValues("reason"),
    };
    action.execute(formData);
  };

  const handleCancel = () => {
    form.reset({
      id,
      currentQuantity: currentQty,
      newQuantity: currentQty,
      reason: "",
    });
    setIsEditing(false);
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
        <FormInput
          disabled
          form={form}
          label="Current Quantity"
          name="currentQuantity"
          placeholder="Current quantity in stock"
          value={currentQty}
        />

        <FormInput
          disabled={!isEditing || action.isPending}
          form={form}
          label="New Quantity"
          name="newQuantity"
          placeholder="Enter new quantity"
        />

        <FormInput
          as={Textarea}
          disabled={!isEditing || action.isPending}
          form={form}
          label="Reason for Adjustment"
          name="reason"
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
