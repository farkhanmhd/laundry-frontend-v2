import { PosVoucherCard } from "@/components/features/pos/pos-voucher";
import { getPosVouchers } from "@/lib/modules/pos/data";

const PosSummaryVoucherSlot = async () => {
  const vouchers = await getPosVouchers();
  return (
    <ul className="space-y-3">
      {vouchers &&
        vouchers.length > 0 &&
        vouchers.map((voucher) => (
          <li key={voucher.id}>
            <PosVoucherCard
              code={voucher.code}
              description={voucher.description}
              discountAmount={voucher.discountAmount}
              expiryDate={voucher.expiryDate as string}
              id={voucher.id}
              pointsCost={voucher.pointsCost}
              userBalance={10}
            />
          </li>
        ))}
    </ul>
  );
};

export default PosSummaryVoucherSlot;
