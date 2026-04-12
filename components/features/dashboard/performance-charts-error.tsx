"use client";

import { AlertCircle, RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cardShadowStyle } from "@/lib/utils";

interface PerformanceChartsErrorProps {
  error?: Error;
  resetErrorBoundary: () => Promise<void>;
}

export function PerformanceChartsError({
  resetErrorBoundary,
}: PerformanceChartsErrorProps) {
  const t = useTranslations("Dashboard.superadmin.performance");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRetry = () => {
    startTransition(() => {
      router.refresh();
      resetErrorBoundary();
    });
  };

  const CHART_CARDS = [
    {
      key: "top-services",
      title: t("topServicesTitle"),
      description: t("topServicesDesc"),
    },
    {
      key: "inventory-usage",
      title: t("inventoryUsageTitle"),
      description: t("inventoryUsageDesc"),
    },
    {
      key: "bundling-stats",
      title: t("bundlingTitle"),
      description: t("bundlingDesc"),
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {CHART_CARDS.map(({ key, title, description }) => (
        <Card key={key} style={cardShadowStyle}>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-2 py-10 text-center text-muted-foreground">
            <AlertCircle className="size-8 text-destructive opacity-70" />
            <p className="text-sm">Failed to load data</p>
          </CardContent>
          <CardFooter className="flex items-center justify-between gap-2">
            <p className="text-muted-foreground text-xs leading-none">
              {description}
            </p>
            <Button
              className="shrink-0"
              disabled={isPending}
              onClick={handleRetry}
              size="sm"
              variant="outline"
            >
              <RefreshCcw
                className={`size-3.5 ${isPending ? "animate-spin" : ""}`}
              />
              {isPending ? "Retrying..." : "Retry"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
