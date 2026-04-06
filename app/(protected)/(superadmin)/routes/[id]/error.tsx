"use client";

import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { cardShadowStyle } from "@/lib/utils";

export default function RouteDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center p-6">
      <Card className="w-full max-w-md" style={cardShadowStyle}>
        <CardContent className="flex flex-col items-center justify-center p-8">
          <Empty>
            <EmptyHeader>
              <EmptyMedia className="mb-4" variant="icon">
                <AlertCircle className="h-12 w-12 text-destructive" />
              </EmptyMedia>
              <EmptyTitle className="font-semibold text-xl">
                Failed to load route details
              </EmptyTitle>
              <EmptyDescription className="mt-2 text-center text-muted-foreground text-sm">
                {error.message ||
                  "We encountered an issue retrieving the route information."}
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent className="mt-6">
              <Button className="gap-2" onClick={reset}>
                <RotateCcw className="h-4 w-4" />
                Try Again
              </Button>
            </EmptyContent>
          </Empty>
        </CardContent>
      </Card>
    </div>
  );
}
