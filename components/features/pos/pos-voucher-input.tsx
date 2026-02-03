"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getVoucherByCode, usePOS } from "@/lib/modules/pos/state";

export const PosVoucherInput = () => {
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
          toast.error("Voucher Minimum Spend is not Met");
        }
      } else {
        toast.error(`Voucher ${inputCode} does not exist`);
      }
    },
    onError: () => {
      toast.error("Voucher does not exist");
    },
  });

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = inputCode.trim();
    if (!cleanCode) {
      toast.error("Please input voucher code");
      return;
    }
    mutate({ search: inputCode });
  };

  return (
    <form className="flex gap-2" onSubmit={handleApply}>
      <Input
        disabled={isPending}
        onChange={(e) => setInputCode(e.target.value)}
        placeholder="Enter Voucher Code"
        value={inputCode}
      />
      <Button disabled={isPending} type="submit">
        Apply
      </Button>
    </form>
  );
};
