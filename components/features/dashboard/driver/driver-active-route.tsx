"use client";

import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useMemo } from "react";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DriverDashboardApi } from "@/lib/modules/driver-dashboard/data";
import { cardShadowStyle } from "@/lib/utils";
import { ErrorSection } from "./error-section";

export function DriverActiveRoute() {
  const { data, isFetching, isLoading, isError, refetch } = useQuery({
    queryKey: ["driver-dashboard", "active-route"],
    queryFn: () => DriverDashboardApi.getActiveRoute(),
  });

  const t = useTranslations("driverDashboard.activeRoute");
  const tStatus = useTranslations("driverDashboard.status");
  const tError = useTranslations("driverDashboard.error");

  type ChartItem = { name: string; value: number };

  const chartConfig = useMemo(() => {
    if (!data?.statusBreakdown) return {};
    const colors = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)"];
    return (data.statusBreakdown as ChartItem[]).reduce(
      (acc: Record<string, { label: string; color: string }>, item: ChartItem, i: number) => ({
        ...acc,
        [item.name]: {
          label: tStatus(item.name),
          color: colors[i % colors.length],
        },
      }),
      {} as Record<string, { label: string; color: string }>
    );
  }, [data, tStatus]);

  if (isLoading || isFetching) {
    return (
      <Card style={cardShadowStyle}>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-32 w-full" />
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
            message={tError("activeRoute")}
            onRetry={() => refetch()}
          />
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card style={cardShadowStyle}>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{t("empty")}</p>
        </CardContent>
      </Card>
    );
  }

  const chartData = ((data.statusBreakdown ?? []) as ChartItem[]).map((item: ChartItem) => ({
    ...item,
    fill:
      chartConfig[item.name]?.color ??
      "var(--chart-5)",
  }));

  return (
    <Card style={cardShadowStyle}>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Badge variant="outline">{data.assetLicensePlate}</Badge>
          <span className="text-sm text-muted-foreground">
            {data.completedDeliveries}/{data.totalDeliveries}
          </span>
        </div>

        <Progress value={data.progress} />

        {chartData.length > 0 && (
          <ChartContainer
            className="mx-auto aspect-square max-h-48 w-full"
            config={chartConfig}
          >
            <PieChart>
              <ChartTooltip
                content={<ChartTooltipContent />}
                cursor={false}
              />
              <Pie
                data={chartData}
                dataKey="value"
                innerRadius={40}
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
                            className="fill-foreground font-bold text-2xl"
                            x={viewBox.cx}
                            y={viewBox.cy}
                          >
                            {data.progress}%
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        )}

        <Button variant="outline" size="sm" asChild>
          <Link href={`/routes/${data.id}`}>{t("viewDetails")}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
