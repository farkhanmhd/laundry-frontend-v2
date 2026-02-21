"use client";

import { useEffect } from "react";
import type { PosVoucher } from "@/lib/modules/pos/data";
import { CustomerOrderVoucherCard } from "./customer-order-voucher";
import { useCustomerOrder } from "./state";

interface Props {
  vouchers: PosVoucher[];
}

export const CustomerOrderVoucherList: React.FC<Props> = ({ vouchers }) => {
  const { isSelectedVoucher, voucherList, setCustomerCart } =
    useCustomerOrder();

  useEffect(() => {
    setCustomerCart((prev) => ({
      ...prev,
      voucherList: vouchers,
    }));
  }, [setCustomerCart, vouchers]);

  return (
    <ul className="space-y-3">
      {voucherList.map((voucher) => (
        <li key={voucher.id}>
          <CustomerOrderVoucherCard
            isSelected={isSelectedVoucher(voucher.id)}
            voucher={voucher}
          />
        </li>
      ))}
    </ul>
  );
};
