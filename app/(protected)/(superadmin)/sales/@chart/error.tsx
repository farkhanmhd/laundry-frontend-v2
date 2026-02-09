"use client"; // Error components must be Client Components

import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SalesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex h-100 w-full items-center justify-center p-4">
      <Card className="max-w-md border-destructive/50 bg-destructive/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <CardTitle className="text-destructive">
              Failed to load Sales Data
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground text-sm">
            {error.message ||
              "An unexpected error occurred while fetching the dashboard data."}
          </p>
        </CardContent>
        <CardFooter className="justify-center">
          <Button onClick={() => reset()} variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
