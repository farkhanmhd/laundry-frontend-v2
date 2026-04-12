"use client";

import { useQuery } from "@tanstack/react-query";
import { Wallet } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { CustomerDashboardApi } from "@/lib/modules/customer-dashboard/data";
import { cardShadowStyle } from "@/lib/utils";
import { UserHeroError } from "./user-hero-error";
import { UserHeroSkeleton } from "./user-hero-skeleton";

export function UserHero() {
  const {
    data: customerInfo,
    isLoading,
    isFetching,
    isError,
    refetch,
    error,
  } = useQuery({
    queryKey: ["customerInfo"],
    queryFn: CustomerDashboardApi.getCustomerInfo,
  });

  const t = useTranslations("Dashboard.user.hero");

  if (isLoading || isFetching) {
    return <UserHeroSkeleton />;
  }

  if (isError) {
    return (
      <UserHeroError error={error as Error} resetErrorBoundary={refetch} />
    );
  }

  if (!customerInfo) {
    return null;
  }

  return (
    <Card
      className="border-none bg-primary text-primary-foreground dark:bg-primary"
      style={cardShadowStyle}
    >
      <CardContent className="py-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <CardTitle className="font-bold text-2xl">
              {t("greeting", { name: customerInfo.name })}
            </CardTitle>
            <CardDescription className="text-primary-foreground/80">
              {customerInfo.phone}
            </CardDescription>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-primary-foreground/10 px-4 py-2 backdrop-blur-sm">
            <div className="rounded-full bg-yellow-400 p-2 text-yellow-900">
              <Wallet className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium text-xs opacity-80">
                {t("currentPoints")}
              </p>
              <p className="font-bold text-xl">
                {customerInfo.points.toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
