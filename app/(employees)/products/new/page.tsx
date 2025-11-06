"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useRouter } from "next/navigation";
import { Controller } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { FormInput } from "@/components/forms/form-input";
import { Textarea } from "@/components/ui/textarea";
import { addProductAction } from "../actions";
import { addProductSchema } from "../schema";

const NewProductPage = () => {
  const { push } = useRouter();
  const { form, handleSubmitWithAction, action } = useHookFormAction(addProductAction, zodResolver(addProductSchema), {
    formProps: {
      mode: "onChange",
    },
    actionProps: {
      onSettled: ({ result: { data } }) => {
        if (data?.status === "success") {
          toast.success(data.message);
          push("/products");
        }
      },
    },
  });

  return (
    <div className='h-full space-y-4 p-6 lg:mx-auto lg:max-w-3xl'>
      <div>
        <h1 className='font-semibold text-2xl'>Create New Product</h1>
        <p className='text-muted-foreground text-sm'>Enter details below to add new product.</p>
      </div>
      <form className='flex flex-col gap-6' onSubmit={handleSubmitWithAction}>
        <FormInput form={form} name='name' label='Product Name' placeholder='Sabun Cair' disabled={action.isPending} />
        <FormInput form={form} name='description' label='Product Description' placeholder='Product description' disabled={action.isPending} as={Textarea} />
        <FormInput form={form} name='price' label='Product Price' placeholder='10000' disabled={action.isPending} as={Textarea} />
        <FormInput form={form} name='currentQuantity' label='Quantity of Product' disabled={action.isPending} />
        <FormInput form={form} name='reorderPoint' label='Reorder Point of Product' disabled={action.isPending} />
        <FormInput form={form} name='image' label='Image' type='file' accept='image/jpeg,image/png,.jpg,.jpeg,.png' />

        <Button disabled={action.isPending} type='submit'>
          Add Product
        </Button>
      </form>
    </div>
  );
};

export default NewProductPage;
