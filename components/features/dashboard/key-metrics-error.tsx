"use client";

import { AlertCircle, RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cardShadowStyle, type ResetQuery } from "@/lib/utils";

const CARD_KEYS = ["revenue", "orders", "members", "staff"];

interface KeyMetricsErrorProps {
  error?: Error;
  resetErrorBoundary: ResetQuery;
}

export function KeyMetricsError({
  error,
  resetErrorBoundary,
}: KeyMetricsErrorProps) {
  const t = useTranslations("Dashboard.superadmin.keyMetrics");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRetry = () => {
    startTransition(() => {
      router.refresh();
      resetErrorBoundary();
    });
  };

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {CARD_KEYS.map((key) => (
        <Card key={key} style={cardShadowStyle}>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-1 text-destructive">
              <AlertCircle className="size-3.5" />
              {t("failedToLoad")}
            </CardDescription>
            <CardTitle className="font-bold text-2xl text-muted-foreground/40">
              —
            </CardTitle>
          </CardHeader>
        </Card>
      ))}
      <div className="col-span-2 flex items-center justify-end gap-2 lg:col-span-4">
        <p className="text-muted-foreground text-xs">
          {error instanceof Error ? error.message : t("errorMessage")}
        </p>
        <Button
          disabled={isPending}
          onClick={handleRetry}
          size="sm"
          variant="outline"
        >
          <RefreshCcw
            className={`size-3.5 ${isPending ? "animate-spin" : ""}`}
          />
          {isPending ? "Retrying..." : t("retry")}
        </Button>
      </div>
    </div>
  );
}
