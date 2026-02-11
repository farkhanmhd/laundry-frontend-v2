import { Skeleton } from "@/components/ui/skeleton";
import { cardShadowStyle } from "@/lib/utils";

export const InventoryLowStockAlertSkeleton = () => {
  return (
    <div className="flex gap-3 rounded-lg border p-4" style={cardShadowStyle}>
      {/* Icon skeleton - matching CheckCircle/AlertCircle size */}
      <Skeleton className="h-5 w-5 rounded-full" />

      {/* Content skeleton - matching Alert structure */}
      <div className="flex-1 space-y-2">
        {/* Title skeleton - similar length to "All stock levels are healthy" or warning message */}
        <Skeleton className="h-5 w-64" />

        {/* Description skeleton - matching typical description length */}
        <Skeleton className="h-4 w-80" />
      </div>
    </div>
  );
};
