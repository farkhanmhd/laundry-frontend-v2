"use client";

import { AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cardShadowStyle, type ResetQuery } from "@/lib/utils";

interface UserHeroErrorProps {
  error?: Error;
  resetErrorBoundary: ResetQuery;
}

export function UserHeroError({ resetErrorBoundary }: UserHeroErrorProps) {
  const t = useTranslations("Dashboard.user.hero");
  return (
    <Card className="border-destructive" style={cardShadowStyle}>
      <CardContent className="flex items-center justify-between gap-3 py-6 text-destructive">
        <div className="flex items-center gap-3">
          <AlertCircle className="h-5 w-5" />
          <p className="font-medium text-sm">{t("failedToLoad")}</p>
        </div>
        <Button
          className="h-8 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
          onClick={() => resetErrorBoundary()}
          size="sm"
          variant="outline"
        >
          {t("retry")}
        </Button>
      </CardContent>
    </Card>
  );
}
