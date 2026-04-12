"use client";

import { AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function OperationalMetricsError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Dashboard.admin.operationalMetrics");
  return (
    <div className="col-span-full">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{t("errorTitle")}</AlertTitle>
        <AlertDescription className="flex items-center justify-between">
          <span>{t("errorMessage")}</span>
          <Button onClick={() => reset()} size="sm" variant="outline">
            {t("retry")}
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
}
