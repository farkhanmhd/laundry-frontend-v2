import { randomUUIDv7 } from "bun";
import { PosVoucherCardSkeleton } from "@/components/features/pos/pos-voucher-card-skeleton";

const VoucherLoading = () => {
  return (
    <ul className="space-y-3">
      {Array.from({ length: 3 }).map(() => (
        <li key={randomUUIDv7()}>
          <PosVoucherCardSkeleton />
        </li>
      ))}
    </ul>
  );
};

export default VoucherLoading;
