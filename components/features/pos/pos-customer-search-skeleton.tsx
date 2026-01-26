import { Skeleton } from "@/components/ui/skeleton";

export const PosCustomerSearchSkeleton = () => {
  return (
    <>
      {Array.from({ length: 3 }).map(() => (
        <div
          className="last:bnot-odd: flex h-16 w-full items-center justify-between border-border border-b px-4 py-3"
          key={Math.random()}
        >
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="ml-2 h-4 w-4 shrink-0" />
        </div>
      ))}
    </>
  );
};
