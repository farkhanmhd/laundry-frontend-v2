"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { addVoucherAction } from "@/lib/modules/vouchers/actions";
import { voucherInsertSchema } from "@/lib/modules/vouchers/schema";
import { VoucherDataForm } from "./voucher-data-form";

export const CreateVoucher = () => {
  const t = useTranslations("Vouchers");
  const { push } = useRouter();
  const formData = useHookFormAction(
    addVoucherAction,
    zodResolver(voucherInsertSchema),
    {
      formProps: {
        mode: "onChange",
        defaultValues: {
          code: "",
          description: "",
          minSpend: 0,
          expiresAt: new Date(),
          isVisible: false,
        },
      },
      actionProps: {
        onSettled: ({ result }) => {
          if (result.data?.status === "success") {
            toast.success(result.data.message);
            push("/vouchers");
          } else {
            toast.error(result.data?.message);
          }
        },
      },
    }
  );

  return (
    <VoucherDataForm
      formData={formData}
      onSubmitVoucherAction={formData.handleSubmitWithAction}
      submitLabel={t("form.createNew")}
    />
  );
};
