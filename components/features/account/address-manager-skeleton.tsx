import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cardShadowStyle } from "@/lib/utils";

export function AddressManagerSkeleton() {
  return (
    <Card style={cardShadowStyle}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="w-full space-y-1.5">
          <div className="flex justify-between gap-3">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-8 w-24" />
          </div>
          <Skeleton className="h-4 w-56" />
        </div>
      </CardHeader>

      <CardContent className="grid gap-4">
        {[1, 2, 3].map((i) => (
          <div className="space-y-4 rounded-lg border p-3" key={i}>
            <div className="space-y-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-48" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-28" />
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
