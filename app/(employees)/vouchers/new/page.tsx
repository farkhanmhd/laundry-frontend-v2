"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { addVoucherAction } from "../actions";
import { addVoucherSchema } from "../schema";
import { FormInput } from "@/components/forms/form-input";
import { FieldGroup, Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Controller } from "react-hook-form";
import { DateTimePicker } from "@/components/forms/date-time-picker";

const NewProductPage = () => {
  const { push } = useRouter();
  const { form, handleSubmitWithAction, action } = useHookFormAction(addVoucherAction, zodResolver(addVoucherSchema), {
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
  });

  return (
    <div className='h-full space-y-4 p-6 lg:mx-auto lg:max-w-3xl'>
      <div>
        <h1 className='font-semibold text-2xl'>Create New Voucher</h1>
        <p className='text-muted-foreground text-sm'>Enter details below to add new voucher.</p>
      </div>
      <form className='flex flex-col gap-6' onSubmit={handleSubmitWithAction}>
        <FormInput form={form} name='name' label='Voucher Name' placeholder='Voucher Name' disabled={action.isPending} />
        <FormInput form={form} name='code' label='Voucher Name' placeholder='Voucher Name' disabled={action.isPending} />
        <FormInput form={form} name='discountAmount' label='Discount Amount' placeholder='Discount Amount' disabled={action.isPending} />
        <FormInput form={form} name='pointsCost' label='Points Cost' placeholder='Discount Amount' disabled={action.isPending} />

        <FieldGroup>
          <Controller
            control={form.control}
            name='expiresAt'
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className='text-base' htmlFor={field.name}>
                  Expiry Date
                </FieldLabel>
                <DateTimePicker date={field.value} onChange={field.onChange} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>

        <Button disabled={action.isPending} type='submit'>
          Add Voucher
        </Button>
      </form>
    </div>
  );
};

export default NewProductPage;
