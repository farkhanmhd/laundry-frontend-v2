import { Skeleton } from "@/components/ui/skeleton";
import { cardShadowStyle } from "@/lib/utils";

type Props = {
  shadow?: boolean;
};

export function OrderListItemSkeleton({ shadow = false }: Props) {
  return (
    <div
      className="space-y-3 rounded-md border p-3"
      style={shadow ? cardShadowStyle : {}}
    >
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-16" />
        </div>
        <Skeleton className="h-4 w-32" />
      </div>

      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-20" />
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-16" />
        </div>
      </div>
    </div>
  );
}
