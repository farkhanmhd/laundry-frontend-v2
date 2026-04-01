import { CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const LowStockLoading = () => {
  const skeletonItems = Array.from({ length: 3 });

  return (
    <CardContent>
      <div className="space-y-2">
        {skeletonItems.map((_, index) => (
          <div
            className="rounded-lg border border-border p-3"
            key={`skeleton-${index}`}
          >
            <div className="mb-2 flex items-start justify-between">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-5 w-12" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="mt-2 h-2 w-full" />
          </div>
        ))}
      </div>
    </CardContent>
  );
};

export default LowStockLoading;
