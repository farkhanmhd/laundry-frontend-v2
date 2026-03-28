import { Skeleton } from "@/components/ui/skeleton";
import { cardShadowStyle } from "@/lib/utils";

type Props = {
  shadow?: boolean;
};

export function DeliveriesItemSkeleton({ shadow = false }: Props) {
  return (
    <div
      className="grid gap-3 rounded-lg border p-4"
      style={shadow ? cardShadowStyle : {}}
    >
      <div className="flex items-start gap-4">
        <div className="flex w-full flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            {/* Type label */}
            <Skeleton className="h-4 w-20" />
            {/* Status badge */}
            <Skeleton className="h-5 w-24 rounded-full" />
          </div>
          <div className="space-y-1.5">
            {/* Address line */}
            <Skeleton className="h-4 w-3/4" />
            {/* Date with clock icon */}
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        {/* Order ID link */}
        <Skeleton className="h-4 w-28" />
        {/* View delivery button */}
        <Skeleton className="h-9 w-32 rounded-md" />
      </div>
    </div>
  );
}
