"use client";

import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function OperationalMetricsError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="col-span-full">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error loading metrics</AlertTitle>
        <AlertDescription className="flex items-center justify-between">
          <span>Failed to fetch operational metrics.</span>
          <Button onClick={() => reset()} size="sm" variant="outline">
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
}
