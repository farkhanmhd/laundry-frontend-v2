import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cardShadowStyle } from "@/lib/utils";

export const OrderStatusChartSkeleton = () => {
  return (
    <Card className="flex flex-col" style={cardShadowStyle}>
      <CardHeader className="items-center gap-2 pb-0">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>
      <CardContent className="flex flex-1 items-center justify-center pb-0">
        {/* Donut ring */}
        <div className="relative my-4 flex items-center justify-center">
          <Skeleton className="size-62.5 rounded-full" />
          <div className="absolute flex size-32.5 flex-col items-center justify-center gap-1 rounded-full bg-card">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-3 w-10" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Skeleton className="h-3 w-56" />
      </CardFooter>
    </Card>
  );
};
