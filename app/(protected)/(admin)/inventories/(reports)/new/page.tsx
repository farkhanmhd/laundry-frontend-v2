"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { FormInput } from "@/components/forms/form-input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { addInventoryAction } from "@/lib/modules/inventories/actions";
import { addInventorySchema } from "@/lib/modules/inventories/schema";
import { formatToIDR } from "@/lib/utils";

const NewInventoryPage = () => {
  const t = useTranslations("Inventories");
  const tValidation = useTranslations("Validation");
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
        <h1 className="font-semibold text-2xl">{t("form.createNew")}</h1>
        <p className="text-muted-foreground text-sm">
          {t("form.createDescription")}
        </p>
      </div>
      <form className="flex flex-col gap-6" onSubmit={handleSubmitWithAction}>
        <FormInput
          disabled={action.isPending}
          form={form}
          label={t("form.inventoryName")}
          name="name"
          placeholder="Sabun Cair"
          tValidation={tValidation}
        />
        <FormInput
          as={Textarea}
          disabled={action.isPending}
          form={form}
          label={t("form.inventoryDescription")}
          name="description"
          placeholder="Inventory description"
          tValidation={tValidation}
        />
        <div className="flex w-full flex-col gap-6 md:flex-row">
          <FormInput
            className="text-right"
            disabled={action.isPending}
            form={form}
            formatValue={(v: unknown) => formatToIDR(Number(v))}
            label={t("form.inventoryPrice")}
            name="price"
            parseValue={(v: string) => Number(v.replace(/[^0-9]/g, ""))}
            placeholder="10000"
            tValidation={tValidation}
          />
        </div>
        <div className="flex w-full flex-col gap-6 md:flex-row">
          <FormInput
            disabled={action.isPending}
            form={form}
            label={t("form.stock")}
            name="stock"
            placeholder="Quantity"
            tValidation={tValidation}
          />
          <FormInput
            disabled={action.isPending}
            form={form}
            label={t("form.safetyStock")}
            name="safetyStock"
            placeholder="Safety Stock Quantity"
            tValidation={tValidation}
          />
        </div>
        <FormInput
          accept="image/jpeg,image/png,.jpg,.jpeg,.png"
          form={form}
          label={t("form.image")}
          name="image"
          tValidation={tValidation}
          type="file"
        />
        <Button disabled={action.isPending} type="submit">
          {t("form.addInventory")}
        </Button>
      </form>
    </div>
  );
};

export default NewInventoryPage;
