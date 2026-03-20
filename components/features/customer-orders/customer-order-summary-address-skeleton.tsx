import { MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function CustomerOrderSummaryAddressSkeleton() {
  return (
    <div className="flex items-center justify-between rounded-lg border p-3 transition-colors">
      <div className="flex items-center gap-3">
        <MapPin className="h-4 w-4 text-muted-foreground" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-40" />
          <Skeleton className="h-2 w-32" />
        </div>
      </div>
      <Skeleton className="h-8 w-16" />
    </div>
  );
}
