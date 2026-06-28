"use client";

import { useQuery } from "@tanstack/react-query";
import { PackageSearch } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { Label, Legend, Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import type { DeliveryStatusData } from "@/lib/modules/driver-dashboard/data";
import { DriverDashboardApi } from "@/lib/modules/driver-dashboard/data";
import { cardShadowStyle } from "@/lib/utils";
import { ErrorSection } from "./error-section";

const STATUS_COLORS: Record<string, string> = {
  requested: "var(--chart-1)",
  in_progress: "var(--chart-2)",
  picked_up: "var(--chart-3)",
  completed: "var(--chart-4)",
  cancelled: "var(--chart-5)",
};

export function DriverStatusChart() {
  const { data, isFetching, isLoading, isError, refetch } = useQuery({
    queryKey: ["driver-dashboard", "delivery-status"],
    queryFn: () => DriverDashboardApi.getDeliveryStatus(),
  });

  const t = useTranslations("driverDashboard.statusChart");
  const tStatus = useTranslations("driverDashboard.status");
  const tError = useTranslations("driverDashboard.error");

  const chartConfig = useMemo(() => {
    if (!data) {
      return {} satisfies ChartConfig;
    }
    return (data as DeliveryStatusData[]).reduce(
      (
        acc: Record<string, { label: string; color: string }>,
        item: DeliveryStatusData
      ) => {
        acc[item.name] = {
          label: tStatus(item.name),
          color: STATUS_COLORS[item.name] ?? "var(--chart-5)",
        };
        return acc;
      },
      {} satisfies ChartConfig
    );
  }, [data, tStatus]);

  const statusChartData = ((data ?? []) as DeliveryStatusData[]).map(
    (item: DeliveryStatusData) => ({
      ...item,
      fill: STATUS_COLORS[item.name] ?? "var(--chart-5)",
    })
  );

  const totalCount = useMemo(
    () =>
      statusChartData.reduce(
        (acc: number, curr: DeliveryStatusData) => acc + curr.value,
        0
      ),
    [statusChartData]
  );

  if (isLoading || isFetching) {
    return (
      <Card style={cardShadowStyle}>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-48 w-full" />
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
            message={tError("statusChart")}
            onRetry={() => refetch()}
          />
        </CardContent>
      </Card>
    );
  }

  if (statusChartData.length === 0) {
    return (
      <Card style={cardShadowStyle}>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-48 flex-col items-center justify-center gap-2 text-muted-foreground">
            <PackageSearch className="size-10 opacity-40" />
            <p className="text-sm">{t("empty")}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card style={cardShadowStyle}>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="mx-auto aspect-square max-h-64"
          config={chartConfig}
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
            <Pie
              data={statusChartData}
              dataKey="value"
              innerRadius={60}
              nameKey="name"
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        dominantBaseline="middle"
                        textAnchor="middle"
                        x={viewBox.cx}
                        y={viewBox.cy}
                      >
                        <tspan
                          className="fill-foreground font-bold text-3xl"
                          x={viewBox.cx}
                          y={viewBox.cy}
                        >
                          {totalCount.toLocaleString()}
                        </tspan>
                        <tspan
                          className="fill-muted-foreground"
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                        >
                          {t("title")}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            <Legend
              content={({ payload }) => (
                <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
                  {payload?.map((entry) => (
                    <div
                      className="flex items-center gap-2 text-sm"
                      key={entry.value}
                    >
                      <div
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: entry.color }}
                      />
                      <span className="text-muted-foreground">
                        {tStatus(entry.value as string)}
                      </span>
                      <span className="font-medium">
                        {statusChartData.find(
                          (d: DeliveryStatusData) => d.name === entry.value
                        )?.value ?? 0}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              verticalAlign="bottom"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
