"use client";

import { useEffect } from "react";
import type { PosVoucher } from "@/lib/modules/pos/data";
import { usePOS } from "@/lib/modules/pos/state";
import { PosVoucherCard } from "./pos-voucher";

interface Props {
  vouchers: PosVoucher[];
}

export const PosVoucherList: React.FC<Props> = ({ vouchers }) => {
  const { isSelectedVoucher, voucherList, setPosData } = usePOS();

  useEffect(() => {
    setPosData((prev) => ({
      ...prev,
      voucherList: vouchers,
    }));
  }, [setPosData, vouchers]);

  return (
    <ul className="space-y-3">
      {voucherList.map((voucher) => (
        <li key={voucher.id}>
          <PosVoucherCard
            isSelected={isSelectedVoucher(voucher.id)}
            voucher={voucher}
          />
        </li>
      ))}
    </ul>
  );
};
