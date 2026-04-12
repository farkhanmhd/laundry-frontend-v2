"use client";

import { AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import type { ResetQuery } from "@/lib/utils";

interface PickupRequestsErrorProps {
  resetErrorBoundary: ResetQuery;
}

export function PickupRequestsError({
  resetErrorBoundary,
}: PickupRequestsErrorProps) {
  const t = useTranslations("Dashboard.admin.pickupRequests");
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{t("errorTitle")}</AlertTitle>
      <AlertDescription className="flex flex-col gap-2">
        <span>{t("errorMessage")}</span>
        <Button
          className="w-fit"
          onClick={() => resetErrorBoundary()}
          size="sm"
          variant="outline"
        >
          {t("retry")}
        </Button>
      </AlertDescription>
    </Alert>
  );
}
