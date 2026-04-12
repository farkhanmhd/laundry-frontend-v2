"use client";

import { AlertCircle, RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cardShadowStyle, type ResetQuery } from "@/lib/utils";

interface OrderStatusErrorProps {
  error?: Error;
  resetErrorBoundary: ResetQuery;
}

export function OrderStatusError({
  error,
  resetErrorBoundary,
}: OrderStatusErrorProps) {
  const t = useTranslations("Dashboard.superadmin.orderStatus");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRetry = () => {
    startTransition(() => {
      router.refresh();
      resetErrorBoundary();
    });
  };

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
            {error instanceof Error ? error.message : String(error)}
          </p>
        </div>
      </CardContent>
      <CardFooter className="justify-center">
        <Button
          disabled={isPending}
          onClick={handleRetry}
          size="sm"
          variant="outline"
        >
          {isPending ? (
            <RefreshCcw className="mr-2 size-3.5 animate-spin" />
          ) : null}
          {t("retry")}
        </Button>
      </CardFooter>
    </Card>
  );
}
