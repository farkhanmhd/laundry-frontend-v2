"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export default function OrderDetailDeliveriesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("CustomerOrders.orderDetail");

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-4 text-center">
      <p className="font-medium text-destructive">{error.message}</p>
      <Button onClick={reset} variant="outline">
        {t("tryAgain")}
      </Button>
    </div>
  );
}
