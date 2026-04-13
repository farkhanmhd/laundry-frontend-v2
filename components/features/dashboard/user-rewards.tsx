"use client";

import { useQuery } from "@tanstack/react-query";
import { Ticket } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { CustomerDashboardApi } from "@/lib/modules/customer-dashboard/data";
import { cardShadowStyle, formatDate } from "@/lib/utils";
import { UserRewardsError } from "./user-rewards-error";
import { UserRewardsSkeleton } from "./user-rewards-skeleton";

export function UserRewards() {
  const {
    data: vouchers,
    isLoading,
    isFetching,
    isError,
    refetch,
    error,
  } = useQuery({
    queryKey: ["customerVouchers"],
    queryFn: CustomerDashboardApi.getVouchers,
  });

  const t = useTranslations("Dashboard.user.myRewards");

  if (isLoading || isFetching) {
    return <UserRewardsSkeleton />;
  }

  if (isError) {
    return (
      <UserRewardsError error={error as Error} resetErrorBoundary={refetch} />
    );
  }

  if (!vouchers) {
    return null;
  }

  return (
    <Card className="gap-0" style={cardShadowStyle}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="font-semibold text-base">
            {t("title")}
          </CardTitle>
        </div>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        {vouchers.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Ticket className="size-8 text-muted-foreground" />
              </EmptyMedia>
              <EmptyTitle>{t("empty")}</EmptyTitle>
              <EmptyDescription>{t("emptyDesc")}</EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="space-y-3">
            {vouchers.map((voucher) => (
              <div
                className="relative flex flex-col gap-2 rounded-lg border border-dashed p-3"
                key={voucher.id}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-medium text-sm">
                        {voucher.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-1 flex items-center justify-between border-t border-dashed pt-2">
                  <div className="flex items-center justify-between rounded bg-muted px-2 py-1">
                    <span className="font-bold font-mono text-[10px] uppercase tracking-wide">
                      {voucher.code}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    Expires{" "}
                    {voucher.expiresAt
                      ? formatDate(voucher.expiresAt)
                      : "No expiration"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
