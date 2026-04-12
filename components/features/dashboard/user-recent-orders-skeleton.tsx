import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cardShadowStyle } from "@/lib/utils";

export function UserRecentOrdersSkeleton() {
  return (
    <Card style={cardShadowStyle}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="font-semibold text-lg">Recent Orders</CardTitle>
          <Skeleton className="h-9 w-24" />
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Skeleton className="h-20 w-full rounded-lg" />
        <Skeleton className="h-20 w-full rounded-lg" />
        <Skeleton className="h-20 w-full rounded-lg" />
      </CardContent>
    </Card>
  );
}
