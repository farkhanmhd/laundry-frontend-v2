"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FormInput } from "@/components/forms/form-input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { addInventoryAction } from "@/lib/modules/inventories/actions";
import { addInventorySchema } from "@/lib/modules/inventories/schema";

const NewInventoryPage = () => {
  const { push } = useRouter();
  const { form, action, handleSubmitWithAction } = useHookFormAction(
    addInventoryAction,
    zodResolver(addInventorySchema),
    {
      formProps: {
        mode: "onChange",
      },
      actionProps: {
        onSettled: ({ result: { data } }) => {
          if (data?.status === "success") {
            toast.success(data.message);
            push("/inventories");
          }
        },
      },
    }
  );

  return (
    <div className="h-full space-y-4 p-6 lg:mx-auto lg:max-w-3xl">
      <div>
        <h1 className="font-semibold text-2xl">Create New Inventory</h1>
        <p className="text-muted-foreground text-sm">
          Enter details below to add new inventory.
        </p>
      </div>
      <form className="flex flex-col gap-6" onSubmit={handleSubmitWithAction}>
        <FormInput
          disabled={action.isPending}
          form={form}
          label="Inventory Name"
          name="name"
          placeholder="Sabun Cair"
        />
        <FormInput
          as={Textarea}
          disabled={action.isPending}
          form={form}
          label="Inventory Description"
          name="description"
          placeholder="Inventory description"
        />
        <div className="flex w-full flex-col gap-6 md:flex-row">
          <FormInput
            className="text-right"
            disabled={action.isPending}
            form={form}
            label="Inventory Price (IDR)"
            name="price"
            placeholder="10000"
          />
        </div>
        <div className="flex w-full flex-col gap-6 md:flex-row">
          <FormInput
            disabled={action.isPending}
            form={form}
            label="Quantity of Inventory"
            name="stock"
            placeholder="Quantity"
          />
          <FormInput
            disabled={action.isPending}
            form={form}
            label="Safety Stock Quantity"
            name="safetyStock"
            placeholder="Safety Stock Quantity"
          />
        </div>
        <FormInput
          accept="image/jpeg,image/png,.jpg,.jpeg,.png"
          form={form}
          label="Image"
          name="image"
          type="file"
        />
        <Button disabled={action.isPending} type="submit">
          Add Inventory
        </Button>
      </form>
    </div>
  );
};

export default NewInventoryPage;
