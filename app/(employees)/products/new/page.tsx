"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FormInput } from "@/components/forms/form-input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { addProductAction } from "../actions";
import { addProductSchema } from "../schema";

const NewProductPage = () => {
  const { push } = useRouter();
  const { form, handleSubmitWithAction, action } = useHookFormAction(
    addProductAction,
    zodResolver(addProductSchema),
    {
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
    }
  );

  return (
    <div className="h-full space-y-4 p-6 lg:mx-auto lg:max-w-3xl">
      <div>
        <h1 className="font-semibold text-2xl">Create New Product</h1>
        <p className="text-muted-foreground text-sm">
          Enter details below to add new product.
        </p>
      </div>
      <form className="flex flex-col gap-6" onSubmit={handleSubmitWithAction}>
        <FormInput
          disabled={action.isPending}
          form={form}
          label="Product Name"
          name="name"
          placeholder="Sabun Cair"
        />
        <FormInput
          as={Textarea}
          disabled={action.isPending}
          form={form}
          label="Product Description"
          name="description"
          placeholder="Product description"
        />
        <FormInput
          disabled={action.isPending}
          form={form}
          label="Product Price"
          name="price"
          placeholder="10000"
        />
        <FormInput
          disabled={action.isPending}
          form={form}
          label="Quantity of Product"
          name="currentQuantity"
          placeholder="Quantity"
        />
        <FormInput
          disabled={action.isPending}
          form={form}
          label="Reorder Point of Product"
          name="reorderPoint"
          placeholder="Reorder Point"
        />
        <FormInput
          accept="image/jpeg,image/png,.jpg,.jpeg,.png"
          form={form}
          label="Image"
          name="image"
          type="file"
        />

        <Button disabled={action.isPending} type="submit">
          Update Product Data
        </Button>
      </form>
    </div>
  );
};

export default NewProductPage;
