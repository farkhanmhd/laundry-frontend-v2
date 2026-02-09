import { randomUUID } from "node:crypto";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SalesChartSkeleton() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <Skeleton className="h-6 w-35" />
      </CardHeader>
      <CardContent className="pl-2">
        {/* Simulates the chart area height (350px) */}
        <div className="flex h-87.5 w-full items-end gap-2 px-2">
          {/* Create fake bars to look like a loading chart */}
          {Array.from({ length: 12 }).map((_) => (
            <Skeleton
              className="w-full rounded-t-md"
              key={randomUUID()}
              style={{
                height: `${Math.random() * 60 + 20}%`,
              }}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
