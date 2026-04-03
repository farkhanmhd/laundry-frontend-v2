"use client";

import { HorizontalBarChart } from "./horizontal-bart-chart";

export type TopServiceItem = {
  service: string;
  label: string;
  revenue: number;
};

const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

type Props = {
  data: TopServiceItem[];
};

export const TopServicesChart = ({ data }: Props) => {
  const rows = data.map((item, i) => ({
    id: item.service,
    label: item.label,
    value: item.revenue,
    revenue: item.revenue,
    fill: CHART_COLORS[i] ?? "var(--chart-5)",
  }));

  const config = {
    revenue: { label: "Revenue" },
    label: { color: "hsl(var(--primary-foreground))" },
    ...Object.fromEntries(
      data.map((item, i) => [
        item.service,
        { label: item.label, color: CHART_COLORS[i] ?? "var(--chart-5)" },
      ])
    ),
  };

  return (
    <HorizontalBarChart
      config={config}
      dataKey="revenue"
      description="Showing top performing services based on revenue"
      rows={rows}
      title="Top Services"
      valueFormatter={(v) => `Rp${(v / 1000).toFixed(0)}k`}
    />
  );
};
