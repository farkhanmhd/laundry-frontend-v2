"use client";

import { PackageSearch } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { Label, Legend, Pie, PieChart } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { OrderStatusData } from "@/lib/modules/admin-dashboard/data";

const STATUS_COLORS: Record<string, string> = {
  pending: "var(--chart-1)",
  processing: "var(--chart-2)",
  ready: "var(--chart-3)",
  completed: "var(--chart-4)",
};

type Props = {
  data: OrderStatusData[];
};

const EmptyChart = () => {
  const t = useTranslations("Dashboard.charts");
  return (
    <div className="flex h-75 flex-col items-center justify-center gap-2 text-muted-foreground">
      <PackageSearch className="size-10 opacity-40" />
      <p className="text-sm">{t("noOrderData")}</p>
    </div>
  );
};

export const OrderStatusChart = ({ data }: Props) => {
  const chartData = data.map((item) => ({
    ...item,
    fill: STATUS_COLORS[item.name] ?? "var(--chart-5)",
  }));
  const t = useTranslations("Dashboard.charts");
  const tStatus = useTranslations("Status");

  const orderStatusConfig = {
    value: { label: t("orders") },
    pending: { label: tStatus("pending"), color: "var(--chart-1)" },
    processing: { label: tStatus("processing"), color: "var(--chart-2)" },
    ready: { label: tStatus("ready"), color: "var(--chart-3)" },
    completed: { label: tStatus("completed"), color: "var(--chart-4)" },
  } satisfies ChartConfig;

  const totalOrdersCount = useMemo(
    () => data.reduce((acc, curr) => acc + curr.value, 0),
    [data]
  );

  if (data.length === 0) {
    return <EmptyChart />;
  }

  return (
    <ChartContainer
      className="mx-auto aspect-square max-h-75"
      config={orderStatusConfig}
    >
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
        <Pie
          data={chartData}
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
                      {totalOrdersCount.toLocaleString()}
                    </tspan>
                    <tspan
                      className="fill-muted-foreground"
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                    >
                      {t("orders")}
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
                    {tStatus(entry.value)}
                  </span>
                  <span className="font-medium">
                    {chartData.find((d) => d.name === entry.value)?.value}
                  </span>
                </div>
              ))}
            </div>
          )}
          verticalAlign="bottom"
        />
      </PieChart>
    </ChartContainer>
  );
};
