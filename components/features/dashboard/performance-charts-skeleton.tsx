import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cardShadowStyle, MapItems } from "@/lib/utils";

const BAR_WIDTHS = ["w-4/5", "w-2/3", "w-1/2", "w-2/5", "w-1/3"];

const BarChartSkeleton = () => (
  <Card style={cardShadowStyle}>
    <CardHeader>
      <Skeleton className="h-5 w-36" />
    </CardHeader>
    <CardContent className="space-y-3">
      <MapItems
        of={BAR_WIDTHS}
        render={(width) => (
          <div className="flex items-center gap-2" key={width}>
            <Skeleton className={`h-8 rounded ${width}`} />
            <Skeleton className="h-4 w-10 shrink-0" />
          </div>
        )}
      />
    </CardContent>
    <CardFooter>
      <Skeleton className="h-3 w-56" />
    </CardFooter>
  </Card>
);

export const PerformanceChartsSkeleton = () => (
  <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
    <BarChartSkeleton />
    <BarChartSkeleton />
    <BarChartSkeleton />
  </div>
);
