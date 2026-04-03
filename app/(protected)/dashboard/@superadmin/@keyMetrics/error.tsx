"use client";

import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cardShadowStyle } from "@/lib/utils";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

const CARD_KEYS = ["revenue", "orders", "members", "staff"];

export default function KeyMetricsError({ error, reset }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {CARD_KEYS.map((key) => (
        <Card key={key} style={cardShadowStyle}>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-1 text-destructive">
              <AlertCircle className="size-3.5" />
              Failed to load {error.message}
            </CardDescription>
            <CardTitle className="font-bold text-2xl text-muted-foreground/40">
              —
            </CardTitle>
          </CardHeader>
        </Card>
      ))}
      <div className="col-span-2 flex items-center justify-end gap-2 lg:col-span-4">
        <p className="text-muted-foreground text-xs">
          Something went wrong while fetching metrics.
        </p>
        <Button onClick={reset} size="sm" variant="outline">
          <RefreshCcw className="size-3.5" />
          Retry
        </Button>
      </div>
    </div>
  );
}
