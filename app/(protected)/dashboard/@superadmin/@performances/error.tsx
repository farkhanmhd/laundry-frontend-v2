"use client";

import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cardShadowStyle } from "@/lib/utils";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

const CHART_CARDS = [
  {
    key: "top-services",
    title: "Top Services",
    description: "Showing top performing services based on revenue",
  },
  {
    key: "inventory-usage",
    title: "Inventory Usage",
    description: "Track consumption of key inventory items",
  },
  {
    key: "bundling-stats",
    title: "Bundling Performance",
    description: "Performance tracking for bundled offers",
  },
];

export default function PerformanceChartsError({ error, reset }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {CHART_CARDS.map(({ key, title, description }) => (
        <Card key={key} style={cardShadowStyle}>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-2 py-10 text-center text-muted-foreground">
            <AlertCircle className="size-8 text-destructive opacity-70" />
            <p className="text-sm">Failed to load data {error.message}</p>
          </CardContent>
          <CardFooter className="flex items-center justify-between gap-2">
            <p className="text-muted-foreground text-xs leading-none">
              {description}
            </p>
            <Button
              className="shrink-0"
              onClick={reset}
              size="sm"
              variant="outline"
            >
              <RefreshCcw className="size-3.5" />
              Retry
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
