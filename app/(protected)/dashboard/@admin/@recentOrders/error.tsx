"use client";

import { PackageX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";

const RecentOrdersError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <CardContent className="flex-1">
      <div className="flex h-64 flex-col items-center justify-center gap-4">
        <PackageX className="h-12 w-12 text-destructive" />
        <div className="text-center">
          <p className="font-medium text-foreground">Failed to load orders</p>
          <p className="text-muted-foreground text-sm">
            {error.message || "Something went wrong"}
          </p>
        </div>
        <Button onClick={reset} variant="outline">
          Try Again
        </Button>
      </div>
    </CardContent>
  );
};

export default RecentOrdersError;
