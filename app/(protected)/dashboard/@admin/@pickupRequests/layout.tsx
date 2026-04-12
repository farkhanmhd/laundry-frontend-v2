"use client";

import { ArrowDownCircle } from "lucide-react";
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

export default function PickupRequestsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("Dashboard.admin.pickupRequests");
  return (
    <Card style={cardShadowStyle}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base text-foreground">
          <ArrowDownCircle className="h-5 w-5 text-primary" />
          {t("title")}
        </CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      {/* The content (page, loading, or error) will be injected here */}
      <CardContent className="grid gap-4">{children}</CardContent>
      <CardFooter className="mt-auto">
        <Link
          className={cn(buttonVariants({ variant: "outline" }), "w-full")}
          href="/pickups"
        >
          {t("viewAll")}
        </Link>
      </CardFooter>
    </Card>
  );
}
