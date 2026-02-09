"use client";

import { format, parse } from "date-fns";
import { id } from "date-fns/locale"; // Import Indonesian locale
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cardShadowStyle } from "@/lib/utils";

interface ChartData {
  date: string;
  net: number;
  discount: number;
}

interface Props {
  data: ChartData[];
}

export function SalesChart({ data }: Props) {
  return (
    <Card className="col-span-4" style={cardShadowStyle}>
      <CardHeader>
        <CardTitle>Revenue Trend</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer height={350} width="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis
              axisLine={false}
              dataKey="date"
              fontSize={12}
              // stroke="#888888"
              tickFormatter={(value) => {
                try {
                  const date = parse(value, "dd-MM-yyyy", new Date());
                  return format(date, "d MMM", { locale: id });
                } catch {
                  return value;
                }
              }}
              // IMPROVEMENT: Format "20-01-2026" to "20 Jan" for cleaner look
              tickLine={false}
            />

            <YAxis
              axisLine={false}
              fontSize={12}
              // stroke="#888888"
              tickFormatter={(value) => `Rp${(value / 1000).toFixed(0)}k`}
              // Formats 1500000 to "1.5jt" or similar
              tickLine={false}
            />

            <Tooltip
              contentStyle={{ borderRadius: "8px" }}
              cursor={{ fill: "transparent" }}
              // Shows full currency in tooltip: Rp 1.500.000
              formatter={(value: number) =>
                new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(value)
              }
            />

            <Legend wrapperStyle={{ paddingTop: "20px" }} />

            {/* Net Revenue (Main Bar) */}
            <Bar
              barSize={32}
              dataKey="net"
              fill="hsl(var(--primary))"
              name="Net Revenue"
              radius={[0, 0, 4, 4]}
              stackId="a" // Sets a nice width for the bars
            />

            {/* Discount (Stacked on top) */}
            <Bar
              barSize={32}
              dataKey="discount"
              fill="hsl(var(--destructive))"
              name="Discount"
              opacity={0.3}
              radius={[4, 4, 0, 0]}
              stackId="a"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
