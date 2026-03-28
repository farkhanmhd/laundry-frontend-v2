import { randomUUID } from "node:crypto";
import { DeliveriesItemSkeleton } from "@/components/features/deliveries/deliveries-item-skeleton";

export default function CustomerDeliveriesLoading() {
  return (
    <>
      {Array.from({ length: 5 }).map(() => (
        <DeliveriesItemSkeleton key={randomUUID()} shadow />
      ))}
    </>
  );
}
