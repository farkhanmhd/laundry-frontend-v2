import { Skeleton } from "@/components/ui/skeleton";

export const PosVoucherCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 rounded-lg border bg-card p-4 shadow-sm">
      {/* Header: Code and Date vs Points */}
      <div className="flex items-start justify-between">
        <div className="space-y-1.5">
          {/* Code */}
          <Skeleton className="h-6 w-24" />
          {/* Date */}
          <Skeleton className="h-4 w-32" />
        </div>
        {/* Points Cost */}
        <Skeleton className="h-5 w-14" />
      </div>

      {/* Description Body */}
      <div className="mt-1 flex flex-col gap-1">
        {/* Description Text */}
        <Skeleton className="h-4 w-full" />
        {/* Savings Amount */}
        <Skeleton className="h-4 w-1/2" />
      </div>

      {/* Footer: Button */}
      <div className="mt-auto flex items-center justify-end pt-2">
        {/* Simulating the 'Apply' button size */}
        <Skeleton className="h-9 w-16" />
      </div>
    </div>
  );
};
