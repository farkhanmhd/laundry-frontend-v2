"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { addVoucherAction } from "@/lib/modules/vouchers/actions";
import { voucherInsertSchema } from "@/lib/modules/vouchers/schema";
import { toastResponse } from "@/lib/toast-helper";
import { VoucherDataForm } from "./voucher-data-form";

export const CreateVoucher = () => {
  const t = useTranslations("Vouchers");
  const tNotifications = useTranslations("Notifications");
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
            toast.success(toastResponse(tNotifications, result.data));
            push("/vouchers");
          } else {
            toast.error(toastResponse(tNotifications, result.data ?? {}));
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
