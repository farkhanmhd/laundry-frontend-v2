import { CustomerOrderEmptyVouchers } from "@/components/features/customer-orders/customer-order-empty-vouchers";
import { CustomerOrderVoucherList } from "@/components/features/customer-orders/customer-order-voucher-list";
import { PosApi } from "@/lib/modules/pos/data";

const CustomerVoucherSlot = async () => {
  const vouchers = await PosApi.getPosVouchers();

  if (!vouchers?.length) {
    return <CustomerOrderEmptyVouchers />;
  }

  return <CustomerOrderVoucherList vouchers={vouchers} />;
};

export default CustomerVoucherSlot;
