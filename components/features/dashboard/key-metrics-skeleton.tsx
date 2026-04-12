import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cardShadowStyle } from "@/lib/utils";

export function KeyMetricsSkeleton() {
  const skeletonKeys = ["revenue", "orders", "members", "staff"];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {skeletonKeys.map((key) => (
        <Card key={key} style={cardShadowStyle}>
          <CardHeader className="pb-2">
            <CardDescription>
              <Skeleton className="h-4 w-24" />
            </CardDescription>
            <CardTitle className="font-bold text-2xl">
              <Skeleton className="h-8 w-20" />
            </CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
