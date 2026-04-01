"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";

const LowStockError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <CardContent>
      <div className="flex h-32 flex-col items-center justify-center gap-4">
        <AlertTriangle className="h-10 w-10 text-destructive" />
        <div className="text-center">
          <p className="font-medium text-foreground">
            Failed to load low stock items
          </p>
          <p className="text-muted-foreground text-sm">
            {error.message || "Something went wrong"}
          </p>
        </div>
        <Button onClick={reset} size="sm" variant="outline">
          Try Again
        </Button>
      </div>
    </CardContent>
  );
};

export default LowStockError;
