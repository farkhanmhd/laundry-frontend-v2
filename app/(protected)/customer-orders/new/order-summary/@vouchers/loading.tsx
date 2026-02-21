import { PosVoucherCardSkeleton } from "@/components/features/pos/pos-voucher-card-skeleton";

const VoucherLoading = () => {
  return (
    <ul className="space-y-3">
      {Array.from({ length: 3 }).map(() => (
        <li key={crypto.randomUUID()}>
          <PosVoucherCardSkeleton />
        </li>
      ))}
    </ul>
  );
};

export default VoucherLoading;
