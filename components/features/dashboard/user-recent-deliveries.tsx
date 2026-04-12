"use client";

import { useQuery } from "@tanstack/react-query";
import { Package } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { DeliveriesItem } from "@/components/features/deliveries/deliveries-item";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { CustomerDashboardApi } from "@/lib/modules/customer-dashboard/data";
import { cardShadowStyle, cn } from "@/lib/utils";
import { UserRecentDeliveriesError } from "./user-recent-deliveries-error";
import { UserRecentDeliveriesSkeleton } from "./user-recent-deliveries-skeleton";

export function UserRecentDeliveries() {
  const {
    data: deliveries,
    isLoading,
    isFetching,
    isError,
    refetch,
    error,
  } = useQuery({
    queryKey: ["customerDeliveries"],
    queryFn: CustomerDashboardApi.getDeliveries,
  });

  const t = useTranslations("Dashboard.user.recentDeliveries");

  if (isLoading || isFetching) {
    return <UserRecentDeliveriesSkeleton />;
  }

  if (isError) {
    return (
      <UserRecentDeliveriesError
        error={error as Error}
        resetErrorBoundary={refetch}
      />
    );
  }

  if (!deliveries) {
    return null;
  }

  return (
    <Card className="gap-3" style={cardShadowStyle}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="font-semibold md:text-lg">
            {t("title")}
          </CardTitle>
          <Link
            className={cn(buttonVariants({ variant: "outline" }))}
            href="/customer-deliveries"
          >
            {t("viewAll")}
          </Link>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        {deliveries.length > 0 ? (
          deliveries.map((delivery) => (
            <DeliveriesItem delivery={delivery} key={delivery.id} />
          ))
        ) : (
          <Empty className="border-none p-0 md:p-0">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Package className="size-6" />
              </EmptyMedia>
              <EmptyTitle>{t("empty")}</EmptyTitle>
              <EmptyDescription>{t("emptyDesc")}</EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </CardContent>
    </Card>
  );
}
