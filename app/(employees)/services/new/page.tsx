"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FormInput } from "@/components/forms/form-input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { addServiceAction } from "../actions";
import { addServiceSchema } from "../schema";

const NewServicePage = () => {
  const { push } = useRouter();
  const { form, handleSubmitWithAction, action } = useHookFormAction(
    addServiceAction,
    zodResolver(addServiceSchema),
    {
      formProps: {
        mode: "onChange",
      },
      actionProps: {
        onSettled: ({ result: { data } }) => {
          if (data?.status === "success") {
            toast.success(data.message);
            push("/services");
          }
        },
      },
    }
  );

  return (
    <div className="h-full space-y-4 p-6 lg:mx-auto lg:max-w-3xl">
      <div>
        <h1 className="font-semibold text-2xl">Create New Service</h1>
        <p className="text-muted-foreground text-sm">
          Enter details below to add new service.
        </p>
      </div>
      <form className="flex flex-col gap-6" onSubmit={handleSubmitWithAction}>
        <FormInput
          disabled={action.isPending}
          form={form}
          label="Service Name"
          name="name"
          placeholder="Service Name"
        />
        <FormInput
          as={Textarea}
          disabled={action.isPending}
          form={form}
          label="Service Description"
          name="description"
          placeholder="Service Description"
        />
        <FormInput
          disabled={action.isPending}
          form={form}
          label="Service Price"
          name="price"
          placeholder="Service Price"
        />
        <FormInput
          accept="image/jpeg,image/png,.jpg,.jpeg,.png"
          form={form}
          label="Image"
          name="image"
          type="file"
        />
        <Button disabled={action.isPending} type="submit">
          Add Service
        </Button>
      </form>
    </div>
  );
};

export default NewServicePage;
