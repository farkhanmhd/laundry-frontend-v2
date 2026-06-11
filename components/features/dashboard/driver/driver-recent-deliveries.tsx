"use client";

import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { RecentDelivery } from "@/lib/modules/driver-dashboard/data";
import { DriverDashboardApi } from "@/lib/modules/driver-dashboard/data";
import { cardShadowStyle, cn } from "@/lib/utils";
import { ErrorSection } from "./error-section";
import { StatusBadge } from "./status-badge";

export function DriverRecentDeliveries() {
  const { data, isFetching, isLoading, isError, refetch } = useQuery({
    queryKey: ["driver-dashboard", "recent-deliveries"],
    queryFn: () => DriverDashboardApi.getRecentDeliveries(),
  });

  const t = useTranslations("driverDashboard.recentDeliveries");
  const tType = useTranslations("driverDashboard.deliveryType");
  const tError = useTranslations("driverDashboard.error");

  if (isLoading || isFetching) {
    return (
      <Card style={cardShadowStyle}>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card style={cardShadowStyle}>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <ErrorSection
            message={tError("recentDeliveries")}
            onRetry={() => refetch()}
          />
        </CardContent>
      </Card>
    );
  }

  const deliveries = data ?? [];

  return (
    <Card style={cardShadowStyle}>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("customer")}</TableHead>
              <TableHead>{t("address")}</TableHead>
              <TableHead>{t("type")}</TableHead>
              <TableHead>{t("status")}</TableHead>
              <TableHead>{t("time")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deliveries.length === 0 ? (
              <TableRow>
                <TableCell
                  className="text-center text-muted-foreground"
                  colSpan={5}
                >
                  {t("empty")}
                </TableCell>
              </TableRow>
            ) : (
              deliveries.map((delivery: RecentDelivery) => (
                <TableRow key={delivery.id}>
                  <TableCell className="font-medium">
                    {delivery.customerName}
                  </TableCell>
                  <TableCell
                    className={cn(
                      "max-w-[200px] truncate",
                      "text-muted-foreground"
                    )}
                    title={delivery.address}
                  >
                    {delivery.address}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {tType(delivery.type)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={delivery.status} />
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {format(
                      new Date(delivery.requestedAt),
                      "dd MMM yyyy HH:mm"
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
