"use client";

import { AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function DeliveryRequestsError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Dashboard.admin.deliveryRequests");
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{t("errorTitle")}</AlertTitle>
      <AlertDescription className="flex flex-col gap-2">
        <span>{t("errorMessage")}</span>
        <Button
          className="w-fit"
          onClick={() => reset()}
          size="sm"
          variant="outline"
        >
          {t("retry")}
        </Button>
      </AlertDescription>
    </Alert>
  );
}
