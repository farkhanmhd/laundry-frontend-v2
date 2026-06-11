"use client";

import { useQuery } from "@tanstack/react-query";
import { AlertCircle, RotateCcw } from "lucide-react";
import { useParams } from "next/navigation";
import { ProgressCard } from "@/components/features/routes/progress-card";
import { TimelineItem } from "@/components/features/routes/timeline-item";
import { UpdateDeliveryDialog } from "@/components/features/routes/update-delivery-dialog";
import { AlertDialogProvider } from "@/components/providers/alert-dialog-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { getRouteDetail } from "@/lib/modules/routes/data";
import { cardShadowStyle, MapItems } from "@/lib/utils";

function ProgressCardSkeleton() {
  return (
    <Card className="gap-3" style={cardShadowStyle}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1.5">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-9 w-16" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-2 w-full rounded-full" />
          <Skeleton className="ml-auto h-4 w-28" />
        </div>
        <Skeleton className="h-10 w-full rounded-md" />
      </CardContent>
    </Card>
  );
}

function DeliveryCardSkeleton() {
  return (
    <div className="relative flex gap-4">
      <Card className="flex-1 gap-2" style={cardShadowStyle}>
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="hidden h-4 w-24 sm:block" />
            </div>
            <Skeleton className="mt-1 h-5 w-36" />
          </div>
          <Skeleton className="h-8 w-28 rounded-md" />
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="flex gap-3">
            <Skeleton className="mt-0.5 h-4 w-4 shrink-0 rounded-full" />
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-52" />
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-muted p-3">
            <Skeleton className="h-4 w-4 shrink-0 rounded-full" />
            <Skeleton className="h-3 w-48" />
          </div>
          <Separator />
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

function RouteSkeleton() {
  return (
    <div className="space-y-6 p-6">
      <div className="mx-auto max-w-3xl space-y-6">
        <ProgressCardSkeleton />
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

function RouteError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center p-6">
      <Card className="w-full max-w-md" style={cardShadowStyle}>
        <CardContent className="flex flex-col items-center justify-center p-8">
          <Empty>
            <EmptyHeader>
              <EmptyMedia className="mb-4" variant="icon">
                <AlertCircle className="h-12 w-12 text-destructive" />
              </EmptyMedia>
              <EmptyTitle className="font-semibold text-xl">
                Failed to load route details
              </EmptyTitle>
              <EmptyDescription className="mt-2 text-center text-muted-foreground text-sm">
                We encountered an issue retrieving the route information.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent className="mt-6">
              <Button className="gap-2" onClick={onRetry}>
                <RotateCcw className="h-4 w-4" />
                Try Again
              </Button>
            </EmptyContent>
          </Empty>
        </CardContent>
      </Card>
    </div>
  );
}

export default function RouteDetailPage() {
  const { id } = useParams<{ id: string }>();

  const {
    data: route,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["route-detail", id],
    queryFn: () => getRouteDetail(id),
  });

  if (isLoading) {
    return <RouteSkeleton />;
  }

  if (isError || !route) {
    return <RouteError onRetry={() => refetch()} />;
  }

  const deliveries = route.deliveries;

  return (
    <AlertDialogProvider>
      <div className="min-h-[calc(100dvh-128px)] space-y-6 p-6 md:min-h-[calc(100dvh-64px)]">
        <div className="mx-auto max-w-3xl space-y-6">
          <ProgressCard deliveries={deliveries} routeId={route.id} />

          <div className="relative space-y-4">
            <MapItems
              of={deliveries}
              render={(delivery) => (
                <TimelineItem delivery={delivery} key={delivery.id} />
              )}
            />
          </div>
        </div>
      </div>
      <UpdateDeliveryDialog />
    </AlertDialogProvider>
  );
}
