import { Skeleton } from "@/components/ui/skeleton";
import { MapItems } from "@/lib/utils";

export const DriverSearchSkeleton = () => {
  return (
    <MapItems
      of={Array.from({ length: 3 })}
      render={() => (
        <div
          className="flex h-16 w-full items-center justify-between border-border border-b px-4 py-3"
          key={crypto.randomUUID()}
        >
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <Skeleton className="ml-2 h-4 w-4 shrink-0" />
        </div>
      )}
    />
  );
};
