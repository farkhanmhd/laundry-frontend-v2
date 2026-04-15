import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function CustomerDeliveryDetailLoading() {
  return (
    <Card className="border-border bg-card shadow-sm">
      {/* Card header */}
      <div className="flex items-center justify-between border-border/50 border-b px-4 py-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-5 w-40" />
        </div>
      </div>

      <CardContent className="space-y-6 pt-6">
        {/* Alert / status block */}
        <div className="flex gap-3 rounded-lg border p-4">
          <Skeleton className="mt-0.5 h-4 w-4 shrink-0 rounded" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>

        {/* 2-col info grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-6">
          {/* Delivery ID */}
          <div className="space-y-1.5">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-5 w-32" />
          </div>

          {/* Type */}
          <div className="space-y-1.5">
            <Skeleton className="h-3 w-12" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-5 w-20" />
            </div>
          </div>

          {/* Order ID */}
          <div className="space-y-1.5">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-5 w-28" />
          </div>

          {/* Requested time */}
          <div className="space-y-1.5">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-5 w-36" />
          </div>
        </div>

        <Separator />

        {/* Address section */}
        <div className="space-y-3">
          {/* Section header + badge */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>

          {/* Address card */}
          <div className="flex gap-3 rounded-lg border bg-secondary/30 p-4">
            <Skeleton className="mt-0.5 h-5 w-5 shrink-0 rounded" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          </div>

          {/* Notes block */}
          <div className="space-y-2 rounded-md border bg-secondary/50 p-3">
            <div className="flex items-center gap-2">
              <Skeleton className="h-3 w-3 rounded" />
              <Skeleton className="h-3 w-32" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
