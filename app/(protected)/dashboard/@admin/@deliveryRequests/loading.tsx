import { randomUUID } from "node:crypto";
import { Skeleton } from "@/components/ui/skeleton";

export default function DeliveryRequestsLoading() {
  return (
    <>
      {Array.from({ length: 3 }).map(() => (
        <div
          className="flex items-start justify-between border-border border-b pb-3 last:border-0 last:pb-0"
          key={randomUUID()}
        >
          <div className="grid w-full gap-2">
            {/* Customer Name */}
            <Skeleton className="h-4 w-32" />
            {/* Address */}
            <div className="mt-1 flex items-center gap-1.5">
              <Skeleton className="h-3 w-3 shrink-0 rounded-full" />
              <Skeleton className="h-3 w-48" />
            </div>
            {/* Badges */}
            <div className="mt-1 flex items-center gap-2">
              <Skeleton className="h-5 w-16 rounded-md" />
              <Skeleton className="h-5 w-20 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
