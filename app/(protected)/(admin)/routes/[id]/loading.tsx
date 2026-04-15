import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cardShadowStyle } from "@/lib/utils";

function DeliveryCardSkeleton() {
  return (
    <div className="relative flex gap-4">
      <Card className="flex-1 gap-2" style={cardShadowStyle}>
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
          <div className="space-y-1">
            {/* Badge + ID */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="hidden h-4 w-24 sm:block" />
            </div>
            {/* Customer name */}
            <Skeleton className="mt-1 h-5 w-36" />
          </div>
          {/* Action button */}
          <Skeleton className="h-8 w-28 rounded-md" />
        </CardHeader>

        <CardContent className="space-y-4 text-sm">
          {/* Address */}
          <div className="flex gap-3">
            <Skeleton className="mt-0.5 h-4 w-4 shrink-0 rounded-full" />
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-52" />
            </div>
          </div>

          {/* Notes */}
          <div className="flex items-center gap-2 rounded-md bg-muted p-3">
            <Skeleton className="h-4 w-4 shrink-0 rounded-full" />
            <Skeleton className="h-3 w-48" />
          </div>

          <Separator />

          {/* Footer actions */}
          <div className="flex items-center justify-between pt-1">
            <Skeleton className="h-9 w-24 rounded-md" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-16 rounded-md" />
              <Skeleton className="h-8 w-16 rounded-md" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function RouteDetailLoading() {
  return (
    <div className="space-y-6 p-6">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* PROGRESS & ACTIONS CARD */}
        <Card className="gap-3" style={cardShadowStyle}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-1.5">
                {/* "Route Progress" title */}
                <Skeleton className="h-5 w-32" />
                {/* Route ID */}
                <Skeleton className="h-4 w-20" />
              </div>
              {/* Percentage */}
              <Skeleton className="h-9 w-16" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              {/* Progress bar */}
              <Skeleton className="h-2 w-full rounded-full" />
              {/* "X of Y stops" */}
              <Skeleton className="ml-auto h-4 w-28" />
            </div>
            {/* Navigation button */}
            <Skeleton className="h-10 w-full rounded-md" />
          </CardContent>
        </Card>

        {/* TIMELINE ITEMS — render 3 placeholder cards */}
        <div className="relative space-y-4">
          <div className="absolute top-6 bottom-6 left-8 -z-10 w-0.5 bg-muted-foreground/20" />
          <DeliveryCardSkeleton />
          <DeliveryCardSkeleton />
          <DeliveryCardSkeleton />
        </div>
      </div>
    </div>
  );
}
