"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { cardShadowStyle } from "@/lib/utils";

export default function RecentOrdersError() {
  const t = useTranslations("Dashboard.user.recentOrders");
  return (
    <Card className="border-destructive" style={cardShadowStyle}>
      <CardContent className="py-6 text-center text-muted-foreground text-sm">
        {t("failedToLoad")}
      </CardContent>
    </Card>
  );
}
