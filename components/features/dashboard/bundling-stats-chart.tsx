"use client";

import { useTranslations } from "next-intl";
import { HorizontalBarChart } from "./horizontal-bart-chart";

export type BundlingStatsItem = {
  bundle: string;
  label: string;
  sales: number;
};

const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

type Props = {
  data: BundlingStatsItem[];
};

export const BundlingStatsChart = ({ data }: Props) => {
  const rows = data.map((item, i) => ({
    id: item.bundle,
    label: item.label,
    value: item.sales,
    sales: item.sales,
    fill: CHART_COLORS[i] ?? "var(--chart-5)",
  }));

  const config = {
    sales: { label: "Sales Count" },
    label: { color: "hsl(var(--primary-foreground))" },
    ...Object.fromEntries(
      data.map((item, i) => [
        item.bundle,
        { label: item.label, color: CHART_COLORS[i] ?? "var(--chart-5)" },
      ])
    ),
  };

  const t = useTranslations("Dashboard.superadmin.performances");

  return (
    <HorizontalBarChart
      config={config}
      dataKey="sales"
      description={t("bundlingStatsDesc")}
      rows={rows}
      title={t("bundlingStats")}
    />
  );
};
