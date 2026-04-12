"use client";

import { AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";

const LowStockError = ({ reset }: { reset: () => void }) => {
  const t = useTranslations("Dashboard.superadmin.lowStock");
  return (
    <CardContent>
      <div className="flex h-32 flex-col items-center justify-center gap-4">
        <AlertTriangle className="h-10 w-10 text-destructive" />
        <div className="text-center">
          <p className="font-medium text-foreground">{t("failedTitle")}</p>
          <p className="text-muted-foreground text-sm">
            {t("somethingWentWrong")}
          </p>
        </div>
        <Button onClick={reset} size="sm" variant="outline">
          {t("tryAgain")}
        </Button>
      </div>
    </CardContent>
  );
};

export default LowStockError;
