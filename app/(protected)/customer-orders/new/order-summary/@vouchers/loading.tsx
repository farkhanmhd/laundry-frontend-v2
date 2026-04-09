import { PosVoucherCardSkeleton } from "@/components/features/pos/pos-voucher-card-skeleton";
import { MapItems } from "@/lib/utils";

const VoucherLoading = () => {
  return (
    <ul className="space-y-3">
      <MapItems
        of={Array.from({ length: 3 })}
        render={(_, i) => (
          <li key={i}>
            <PosVoucherCardSkeleton />
          </li>
        )}
      />
    </ul>
  );
};

export default VoucherLoading;
