import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cardShadowStyle } from "@/lib/utils";

export const SalesCardSkeleton = () => {
  return (
    <Card style={cardShadowStyle}>
      <CardHeader>
        <div className="flex w-full items-center justify-between">
          {/* Title Skeleton */}
          <Skeleton className="h-5 w-30" />
          {/* Icon Skeleton */}
          <Skeleton className="h-4 w-4 rounded-full" />
        </div>
      </CardHeader>
      <CardContent>
        {/* Value Skeleton (Height matches text-3xl) */}
        <Skeleton className="h-9 w-25" />
      </CardContent>
      <CardFooter>
        {/* Description Skeleton */}
        <Skeleton className="h-4 w-[80%]" />
      </CardFooter>
    </Card>
  );
};
