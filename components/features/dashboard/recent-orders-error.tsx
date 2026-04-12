"use client";

import { PackageX } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import type { ResetQuery } from "@/lib/utils";

interface RecentOrdersErrorProps {
  error?: Error;
  resetErrorBoundary: ResetQuery;
}

export function RecentOrdersError({
  error,
  resetErrorBoundary,
}: RecentOrdersErrorProps) {
  const t = useTranslations("Dashboard.admin.recentOrders");
  return (
    <CardContent className="flex-1">
      <div className="flex h-64 flex-col items-center justify-center gap-4">
        <PackageX className="h-12 w-12 text-destructive" />
        <div className="text-center">
          <p className="font-medium text-foreground">{t("failedTitle")}</p>
          <p className="text-muted-foreground text-sm">
            {error instanceof Error ? error.message : t("failedMessage")}
          </p>
        </div>
        <Button onClick={() => resetErrorBoundary()} variant="outline">
          {t("tryAgain")}
        </Button>
      </div>
    </CardContent>
  );
}
