"use client";

import { AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cardShadowStyle } from "@/lib/utils";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function OrderStatusError({ error, reset }: Props) {
  const t = useTranslations("Dashboard.superadmin.orderStatus");
  return (
    <Card className="flex flex-col" style={cardShadowStyle}>
      <CardHeader className="items-center pb-0">
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col items-center justify-center gap-3 py-8 text-center">
        <AlertCircle className="size-10 text-destructive opacity-80" />
        <div className="space-y-1">
          <p className="font-medium text-sm">{t("failedTitle")}</p>
          <p className="max-w-55 text-muted-foreground text-xs">
            {t("failedMessage")}
            {error.message}
          </p>
        </div>
      </CardContent>
      <CardFooter className="justify-center">
        <Button onClick={reset} size="sm" variant="outline">
          {t("retry")}
        </Button>
      </CardFooter>
    </Card>
  );
}
