"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateVoucherAction } from "@/lib/modules/vouchers/actions";
import type { Voucher } from "@/lib/modules/vouchers/data";
import { voucherInsertSchema } from "@/lib/modules/vouchers/schema";
import { VoucherDataForm } from "./voucher-data-form";

type Props = {
  voucher: Voucher;
};

export const UpdateVoucher = ({ voucher }: Props) => {
  const { push } = useRouter();
  const formData = useHookFormAction(
    updateVoucherAction,
    zodResolver(voucherInsertSchema),
    {
      formProps: {
        mode: "onChange",
        values: {
          ...voucher,
          isVisible: voucher.isVisible ? voucher.isVisible : false,
          expiresAt: new Date(voucher.expiresAt as string),
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

  return (
    <VoucherDataForm
      formData={formData}
      onSubmitVoucherAction={formData.handleSubmitWithAction}
      submitLabel="Update Voucher"
    />
  );
};
