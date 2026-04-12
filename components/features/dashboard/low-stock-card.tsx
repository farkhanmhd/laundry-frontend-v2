"use client";

import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cardShadowStyle, cn } from "@/lib/utils";

export function LowStockCard({ children }: { children: React.ReactNode }) {
  const t = useTranslations("Dashboard.superadmin.lowStock");

  return (
    <Card style={cardShadowStyle}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            {t("title")}
          </CardTitle>
          <Link
            className={cn(buttonVariants({ variant: "secondary" }))}
            href="/inventories"
          >
            {t("viewAll")}
          </Link>
        </div>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      {children}
    </Card>
  );
}
