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
import { updateVoucherAction } from "@/lib/modules/vouchers/actions";
import {
  type UpdateVoucherSchema,
  updateVoucherSchema,
} from "@/lib/modules/vouchers/schema";

export const VoucherDataForm = ({
  id,
  name,
  code,
  discountAmount,
  pointsCost,
  expiresAt,
}: UpdateVoucherSchema) => {
  const { push } = useRouter();
  const { form, action } = useHookFormAction(
    updateVoucherAction,
    zodResolver(updateVoucherSchema),
    {
      formProps: {
        mode: "onChange",
        values: {
          id,
          name: name ?? "",
          code: code ?? "",
          discountAmount: discountAmount ?? 0,
          pointsCost: pointsCost ?? 0,
          expiresAt: expiresAt ?? new Date(),
        },
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

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData: UpdateVoucherSchema = {
      id,
      name: form.getValues("name") as string,
      code: form.getValues("code") as string,
      discountAmount: form.getValues("discountAmount") as number,
      pointsCost: form.getValues("pointsCost") as number,
      expiresAt: form.getValues("expiresAt") as Date,
    };

    action.execute(formData);
  };

  return (
    <div className="h-full space-y-4 p-6 lg:mx-auto lg:max-w-3xl">
      <div>
        <h1 className="font-semibold text-2xl">Voucher</h1>
        <p className="text-muted-foreground text-sm">
          Enter details below to modify voucher.
        </p>
      </div>
      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
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
          label="Voucher Code"
          name="code"
          placeholder="Voucher Code"
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
          Update Voucher
        </Button>
      </form>
    </div>
  );
};
