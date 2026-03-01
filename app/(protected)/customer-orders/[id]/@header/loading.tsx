import { Skeleton } from "@/components/ui/skeleton";

export default function OrderDetailHeaderLoading() {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Skeleton className="h-7 w-32" />
        <Skeleton className="h-5 w-20" />
      </div>
      <Skeleton className="h-4 w-40" />
    </div>
  );
}
