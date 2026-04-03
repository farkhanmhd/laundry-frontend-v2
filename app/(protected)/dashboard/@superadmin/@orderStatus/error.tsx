"use client";

import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cardShadowStyle } from "@/lib/utils";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function OrderStatusError({ error, reset }: Props) {
  return (
    <Card className="flex flex-col" style={cardShadowStyle}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Order Status Distribution</CardTitle>
        <CardDescription>Breakdown of current orders by status</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col items-center justify-center gap-3 py-8 text-center">
        <AlertCircle className="size-10 text-destructive opacity-80" />
        <div className="space-y-1">
          <p className="font-medium text-sm">Failed to load order status</p>
          <p className="max-w-55 text-muted-foreground text-xs">
            Something went wrong while fetching data. Please try again.{" "}
            {error.message}
          </p>
        </div>
      </CardContent>
      <CardFooter className="justify-center">
        <Button onClick={reset} size="sm" variant="outline">
          <RefreshCcw className="size-4" />
          Retry
        </Button>
      </CardFooter>
    </Card>
  );
}
