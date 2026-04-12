import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cardShadowStyle } from "@/lib/utils";

export function UserHeroSkeleton() {
  return (
    <Card className="border-none bg-primary/40" style={cardShadowStyle}>
      <CardContent className="flex flex-col justify-between gap-4 py-6 md:flex-row md:items-center">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48 bg-primary-foreground/20" />
          <Skeleton className="h-4 w-32 bg-primary-foreground/20" />
        </div>
        <Skeleton className="h-16 w-40 rounded-lg bg-primary-foreground/20" />
      </CardContent>
    </Card>
  );
}
