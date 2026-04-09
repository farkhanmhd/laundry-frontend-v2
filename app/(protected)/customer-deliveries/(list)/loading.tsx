import { DeliveriesItemSkeleton } from "@/components/features/deliveries/deliveries-item-skeleton";
import { MapItems } from "@/lib/utils";

export default function CustomerDeliveriesLoading() {
  return (
    <MapItems
      of={Array.from({ length: 5 })}
      render={(_, i) => <DeliveriesItemSkeleton key={i} shadow />}
    />
  );
}
