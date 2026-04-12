"use client";

import { AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import type { ResetQuery } from "@/lib/utils";

interface OperationalMetricsErrorProps {
  resetErrorBoundary: ResetQuery;
}

export function OperationalMetricsError({
  resetErrorBoundary,
}: OperationalMetricsErrorProps) {
  const t = useTranslations("Dashboard.admin.operationalMetrics");
  return (
    <div className="col-span-full">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{t("errorTitle")}</AlertTitle>
        <AlertDescription className="flex items-center justify-between">
          <span>{t("errorMessage")}</span>
          <Button
            onClick={() => resetErrorBoundary()}
            size="sm"
            variant="outline"
          >
            {t("retry")}
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
}
