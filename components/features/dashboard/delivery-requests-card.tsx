"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cardShadowStyle, cn } from "@/lib/utils";

export function DeliveryRequestsCard({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("Dashboard.admin.deliveryRequests");

  return (
    <Card style={cardShadowStyle}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base text-foreground">
          {t("title")}
        </CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">{children}</CardContent>
      <CardFooter className="mt-auto">
        <Link
          className={cn(buttonVariants({ variant: "outline" }), "w-full")}
          href="/deliveries"
        >
          {t("viewAll")}
        </Link>
      </CardFooter>
    </Card>
  );
}
