import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TierProgress() {
  const currentTier = "Silver";
  const nextTier = "Gold";
  const currentPoints = 2450;
  const nextTierThreshold = 5000;

  const progress = (currentPoints / nextTierThreshold) * 100;

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Member Tier</CardTitle>
          <Badge className="px-3 py-1 text-base" variant="outline">
            {currentTier}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Progress to {nextTier}
            </span>
            <span className="font-semibold text-foreground">
              {currentPoints.toLocaleString()} /{" "}
              {nextTierThreshold.toLocaleString()} points
            </span>
          </div>
          <div className="relative h-3 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <p className="text-muted-foreground text-xs">
            Earn {nextTierThreshold - currentPoints} more points to reach{" "}
            {nextTier} tier and unlock exclusive benefits
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
