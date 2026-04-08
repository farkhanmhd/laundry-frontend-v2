"use client";

import { BarChart2 } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cardShadowStyle } from "@/lib/utils";

type ChartRow = {
  id: string;
  label: string;
  value: number;
  fill: string;
};

export type HorizontalBarChartProps = {
  title: string;
  description: string;
  dataKey: string;
  valueFormatter?: (value: number) => string;
  rows: ChartRow[];
  config: ChartConfig;
};

const EmptyBarChart = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <Card style={cardShadowStyle}>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex h-full flex-col items-center justify-center gap-2 py-10 text-center text-muted-foreground">
      <BarChart2 className="size-10 opacity-40" />
      <p className="text-sm">No data available</p>
    </CardContent>
    <CardFooter className="mt-auto flex-col items-start gap-2 text-sm">
      <div className="text-muted-foreground leading-none">{description}</div>
    </CardFooter>
  </Card>
);

export const HorizontalBarChart = ({
  title,
  description,
  dataKey,
  valueFormatter,
  rows,
  config,
}: HorizontalBarChartProps) => {
  if (rows.length === 0) {
    return <EmptyBarChart description={description} title={title} />;
  }

  return (
    <Card style={cardShadowStyle}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <BarChart
            accessibilityLayer
            data={rows}
            layout="vertical"
            margin={{ right: 16 }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              axisLine={false}
              dataKey="id"
              hide
              tickLine={false}
              tickMargin={10}
              type="category"
            />
            <XAxis dataKey={dataKey} hide type="number" />
            <ChartTooltip
              content={<ChartTooltipContent indicator="line" />}
              cursor={false}
            />
            <Bar dataKey={dataKey} layout="vertical" radius={4}>
              <LabelList
                className="fill-white"
                dataKey="label"
                fontSize={12}
                offset={8}
                position="insideLeft"
              />
              <LabelList
                className="fill-foreground"
                dataKey={dataKey}
                fontSize={12}
                formatter={valueFormatter}
                offset={8}
                position="right"
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="text-muted-foreground leading-none">{description}</div>
      </CardFooter>
    </Card>
  );
};
