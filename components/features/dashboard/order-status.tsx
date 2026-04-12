"use client";

import { useQuery } from "@tanstack/react-query";
import { format, startOfMonth } from "date-fns";
import { useTranslations } from "next-intl";
import { OrderStatusChart } from "@/components/features/dashboard/order-status-chart";
import { OrderStatusChartSkeleton } from "@/components/features/dashboard/order-status-chart-skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AdminDashboardApi } from "@/lib/modules/admin-dashboard/data";
import {
  cardShadowStyle,
  type DateRangeSearchParams,
  getDateRange,
} from "@/lib/utils";
import { OrderStatusError } from "./order-status-error";

export function OrderStatus({
  searchParams,
}: {
  searchParams: DateRangeSearchParams;
}) {
  const t = useTranslations("Dashboard.superadmin.orderStatus");

  const dateRange = getDateRange(searchParams);
  const query = {
    from: format(dateRange.from || startOfMonth(new Date()), "dd-MM-yyyy"),
    to: format(dateRange.to || new Date(), "dd-MM-yyyy"),
  };

  const { data, isLoading, isFetching, isError, refetch, error } = useQuery({
    queryKey: ["orderStatus", query.from, query.to],
    queryFn: () => AdminDashboardApi.getOrderStatus(query),
  });

  if (isLoading || isFetching) {
    return <OrderStatusChartSkeleton />;
  }

  if (isError) {
    return (
      <OrderStatusError error={error as Error} resetErrorBoundary={refetch} />
    );
  }

  if (!data) {
    return null;
  }

  return (
    <Card className="flex flex-col" style={cardShadowStyle}>
      <CardHeader className="items-center pb-0">
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <OrderStatusChart data={data} />
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="text-muted-foreground leading-none">{t("footer")}</div>
      </CardFooter>
    </Card>
  );
}
