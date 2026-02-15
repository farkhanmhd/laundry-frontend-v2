"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { FormInput } from "@/components/forms/form-input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { addServiceAction } from "@/lib/modules/services/actions";
import { addServiceSchema } from "@/lib/modules/services/schema";

const NewServicePage = () => {
  const t = useTranslations("Services");
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
        <h1 className="font-semibold text-2xl">{t("form.createNew")}</h1>
        <p className="text-muted-foreground text-sm">
          {t("form.createDescription")}
        </p>
      </div>
      <form className="flex flex-col gap-6" onSubmit={handleSubmitWithAction}>
        <FormInput
          disabled={action.isPending}
          form={form}
          label={t("form.serviceName")}
          name="name"
          placeholder="Service Name"
        />
        <FormInput
          as={Textarea}
          disabled={action.isPending}
          form={form}
          label={t("form.serviceDescription")}
          name="description"
          placeholder="Service Description"
        />
        <FormInput
          disabled={action.isPending}
          form={form}
          label={t("form.servicePrice")}
          name="price"
          placeholder="Service Price"
        />
        <FormInput
          accept="image/jpeg,image/png,.jpg,.jpeg,.png"
          form={form}
          label={t("form.image")}
          name="image"
          type="file"
        />
        <Button disabled={action.isPending} type="submit">
          {t("form.addService")}
        </Button>
      </form>
    </div>
  );
};

export default NewServicePage;
