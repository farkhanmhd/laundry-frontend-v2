"use client";

import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getVoucherByCode, usePOS } from "@/lib/modules/pos/state";

export const PosVoucherInput = () => {
  const t = useTranslations("POS.voucherInput");
  const [inputCode, setInputCode] = useState("");
  const { handleSelectVoucher, totalAmount, setPosData } = usePOS();
  const { mutate, isPending } = useMutation({
    mutationFn: getVoucherByCode,
    onSuccess: (data) => {
      if (data) {
        if (totalAmount >= data.minSpend) {
          setPosData((prev) => {
            const voucherExist = prev.voucherList.some(
              (item) => item.id === data.id
            );
            if (voucherExist) {
              return prev;
            }

            return {
              ...prev,
              voucherList: [data, ...prev.voucherList],
            };
          });
          handleSelectVoucher(data);
        } else {
          toast.error(t("minimumSpendNotMet"));
        }
      } else {
        toast.error(t("voucherDoesNotExist", { code: inputCode }));
      }
    },
    onError: () => {
      toast.error(t("voucherNotExist"));
    },
  });

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = inputCode.trim();
    if (!cleanCode) {
      toast.error(t("pleaseInputCode"));
      return;
    }
    mutate({ search: inputCode });
  };

  return (
    <form className="flex gap-2" onSubmit={handleApply}>
      <Input
        disabled={isPending}
        onChange={(e) => setInputCode(e.target.value)}
        placeholder={t("enterVoucherCode")}
        value={inputCode}
      />
      <Button disabled={isPending} type="submit">
        {t("apply")}
      </Button>
    </form>
  );
};
