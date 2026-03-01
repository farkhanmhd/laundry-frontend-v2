import { Skeleton } from "@/components/ui/skeleton";
import { cardShadowStyle } from "@/lib/utils";

export default function OrderDetailDeliveriesLoading() {
  return (
    <div className="space-y-3 rounded-md border p-4" style={cardShadowStyle}>
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-5 w-16" />
      </div>
      <div className="flex items-start gap-2">
        <Skeleton className="mt-1 h-4 w-4" />
        <div className="w-full space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  );
}
