import { PosSummaryEmptyVouchers } from "@/components/features/pos/pos-summary-empty-vouchers";
import { PosVoucherList } from "@/components/features/pos/pos-voucher-list";
import { getPosVouchers } from "@/lib/modules/pos/data";

const PosSummaryVoucherSlot = async () => {
  const vouchers = await getPosVouchers();

  if (!vouchers?.length) {
    return <PosSummaryEmptyVouchers />;
  }

  return <PosVoucherList vouchers={vouchers} />;
};

export default PosSummaryVoucherSlot;
