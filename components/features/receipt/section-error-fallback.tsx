// components/features/receipt/section-error-fallback.tsx
"use client";

import { AlertCircle } from "lucide-react";
import type { FallbackProps } from "react-error-boundary";
import { Button } from "@/components/ui/button";
import { SectionCard } from "./order-ui";

export function SectionErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  let errorMessage = "An unknown error occurred";

  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  }

  return (
    <SectionCard className="border-destructive/50 bg-destructive/5">
      <div className="flex items-center justify-between">
        <p className="font-medium text-[13px] text-destructive">Error</p>
        <AlertCircle className="size-4 text-destructive" />
      </div>

      <p
        className="mt-2 w-full truncate text-[12px] text-muted-foreground"
        title={errorMessage}
      >
        {errorMessage}
      </p>

      <Button
        className="mt-3 h-7 text-xs"
        onClick={resetErrorBoundary}
        size="sm"
        variant="outline"
      >
        Try Again
      </Button>
    </SectionCard>
  );
}
