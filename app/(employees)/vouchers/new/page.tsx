"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useRouter } from "next/navigation";
import { Controller } from "react-hook-form";
import { toast } from "sonner";
import { DateTimePicker } from "@/components/forms/date-time-picker";
import { FormInput } from "@/components/forms/form-input";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { addVoucherAction } from "../actions";
import { addVoucherSchema } from "../schema";

const NewProductPage = () => {
  const { push } = useRouter();
  const { form, handleSubmitWithAction, action } = useHookFormAction(
    addVoucherAction,
    zodResolver(addVoucherSchema),
    {
      formProps: {
        mode: "onChange",
      },
      actionProps: {
        onSettled: ({ result: { data } }) => {
          if (data?.status === "success") {
            toast.success(data.message);
            push("/vouchers");
          }
        },
      },
    }
  );

  return (
    <div className="h-full space-y-4 p-6 lg:mx-auto lg:max-w-3xl">
      <div>
        <h1 className="font-semibold text-2xl">Create New Voucher</h1>
        <p className="text-muted-foreground text-sm">
          Enter details below to add new voucher.
        </p>
      </div>
      <form className="flex flex-col gap-6" onSubmit={handleSubmitWithAction}>
        <FormInput
          disabled={action.isPending}
          form={form}
          label="Voucher Name"
          name="name"
          placeholder="Voucher Name"
        />
        <FormInput
          disabled={action.isPending}
          form={form}
          label="Voucher Name"
          name="code"
          placeholder="Voucher Name"
        />
        <FormInput
          disabled={action.isPending}
          form={form}
          label="Discount Amount"
          name="discountAmount"
          placeholder="Discount Amount"
        />
        <FormInput
          disabled={action.isPending}
          form={form}
          label="Points Cost"
          name="pointsCost"
          placeholder="Discount Amount"
        />

        <FieldGroup>
          <Controller
            control={form.control}
            name="expiresAt"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-base" htmlFor={field.name}>
                  Expiry Date
                </FieldLabel>
                <DateTimePicker date={field.value} onChange={field.onChange} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <Button disabled={action.isPending} type="submit">
          Add Voucher
        </Button>
      </form>
    </div>
  );
};

export default NewProductPage;
