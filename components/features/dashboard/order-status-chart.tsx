"use client";

import { PackageSearch } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { Label, Pie, PieChart } from "recharts";
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

const orderStatusConfig = {
  value: { label: "Orders" },
  pending: { label: "Pending", color: "var(--chart-1)" },
  processing: { label: "Processing", color: "var(--chart-2)" },
  ready: { label: "Ready", color: "var(--chart-3)" },
  completed: { label: "Completed", color: "var(--chart-4)" },
} satisfies ChartConfig;

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
        <ChartTooltip
          content={<ChartTooltipContent hideLabel />}
          cursor={false}
        />
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
      </PieChart>
    </ChartContainer>
  );
};
