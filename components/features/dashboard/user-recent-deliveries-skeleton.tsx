import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cardShadowStyle } from "@/lib/utils";

export function UserRecentDeliveriesSkeleton() {
  return (
    <Card className="gap-3" style={cardShadowStyle}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="font-semibold md:text-lg">
            Recent Deliveries
          </CardTitle>
          <Skeleton className="h-9 w-24" />
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Skeleton className="h-24 w-full rounded-lg" />
        <Skeleton className="h-24 w-full rounded-lg" />
      </CardContent>
    </Card>
  );
}
