import { HorizontalBarChart } from "./horizontal-bart-chart";

export type InventoryUsageItem = {
  item: string;
  label: string;
  usage: number;
};

const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

type Props = {
  data: InventoryUsageItem[];
};

export const InventoryUsageChart = ({ data }: Props) => {
  const rows = data.map((item, i) => ({
    id: item.item,
    label: item.label,
    value: item.usage,
    usage: item.usage,
    fill: CHART_COLORS[i] ?? "var(--chart-5)",
  }));

  const config = {
    usage: { label: "Units Used" },
    label: { color: "hsl(var(--primary-foreground))" },
    ...Object.fromEntries(
      data.map((item, i) => [
        item.item,
        { label: item.label, color: CHART_COLORS[i] ?? "var(--chart-5)" },
      ])
    ),
  };

  return (
    <HorizontalBarChart
      config={config}
      dataKey="usage"
      description="Track consumption of key inventory items"
      rows={rows}
      title="Inventory Usage"
    />
  );
};
