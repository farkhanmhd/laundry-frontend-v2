"use client";

import { AlertCircle } from "lucide-react";
import type { FallbackProps } from "react-error-boundary";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cardShadowStyle } from "@/lib/utils";

export const ScoreCardErrorFallback = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  let errorMessage = "An unknown Error occured";

  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  }
  return (
    <Card
      className="border-destructive/50 bg-destructive/5"
      style={cardShadowStyle}
    >
      <CardHeader>
        <div className="flex w-full items-center justify-between">
          <CardTitle className="font-medium text-destructive">Error</CardTitle>
          <AlertCircle className="h-4 w-4 text-destructive" />
        </div>
      </CardHeader>
      <CardContent className="font-semibold text-3xl text-muted-foreground">
        --
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2">
        <p
          className="w-full truncate text-muted-foreground text-xs"
          title={errorMessage}
        >
          {errorMessage || "Failed to load data"}
        </p>
        <Button
          className="h-7 text-xs"
          onClick={resetErrorBoundary}
          size="sm"
          variant="outline"
        >
          Try Again
        </Button>
      </CardFooter>
    </Card>
  );
};
