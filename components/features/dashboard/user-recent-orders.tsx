"use client";

import { useQuery } from "@tanstack/react-query";
import { ClipboardList } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { OrderListItem } from "@/components/features/orders/order-list-item";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import type { CustomerOrder } from "@/hooks/use-customer-orders";
import { CustomerDashboardApi } from "@/lib/modules/customer-dashboard/data";
import { cardShadowStyle, cn } from "@/lib/utils";
import { UserRecentOrdersError } from "./user-recent-orders-error";
import { UserRecentOrdersSkeleton } from "./user-recent-orders-skeleton";

export function UserRecentOrders() {
  const {
    data: orders,
    isLoading,
    isFetching,
    isError,
    refetch,
    error,
  } = useQuery({
    queryKey: ["customerRecentOrders"],
    queryFn: CustomerDashboardApi.getOrders,
  });

  const t = useTranslations("Dashboard.user.recentOrders");

  if (isLoading || isFetching) {
    return <UserRecentOrdersSkeleton />;
  }

  if (isError) {
    return (
      <UserRecentOrdersError
        error={error as Error}
        resetErrorBoundary={refetch}
      />
    );
  }

  if (!orders) {
    return null;
  }

  const mappedOrders: CustomerOrder[] = orders.map((order) => ({
    id: order.id,
    status: order.status as CustomerOrder["status"],
    total: order.total,
    createdAt: order.createdAt,
  }));

  return (
    <Card style={cardShadowStyle}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="font-semibold text-lg">{t("title")}</CardTitle>
          <Link
            className={cn(buttonVariants({ variant: "outline" }))}
            href="/customer-orders"
          >
            {t("viewAll")}
          </Link>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        {mappedOrders.length > 0 ? (
          mappedOrders.map((order) => (
            <OrderListItem key={order.id} order={order} />
          ))
        ) : (
          <Empty className="border-none p-0 md:p-0">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <ClipboardList className="size-6" />
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
