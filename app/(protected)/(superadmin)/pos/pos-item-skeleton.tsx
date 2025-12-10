import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PosItemSkeleton() {
  return (
    <Card
      aria-busy="true"
      aria-roledescription="button"
      className="h-full overflow-hidden rounded-3xl p-2"
    >
      <CardContent className="flex flex-1 flex-col justify-between gap-4 px-0">
        {/* Image placeholder */}
        <Skeleton className="aspect-square max-h-[300px] rounded-md" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-2 w-full" />
        </div>

        {/* Footer placeholders: name and price */}
        <CardFooter className="flex h-7 items-center justify-between gap-2 p-0">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-5 w-5 rounded-full" />
        </CardFooter>
      </CardContent>
    </Card>
  );
}
