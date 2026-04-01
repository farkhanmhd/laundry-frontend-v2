"use client";

import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  LabelList,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
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
import { cardShadowStyle, cn } from "@/lib/utils";

// --- DASHBOARD METRICS ---
const dashboardMetrics = {
  totalRevenue: 4_850_000, // sum of payment.total where order.status equal completed
  totalOrders: 324, // count orders
  activeMembers: 156, // count members
  totalStaff: 12, // count user with admin role
};

const orderStatusData = [
  { name: "Pending", value: 24, fill: "var(--chart-1)" },
  { name: "Processing", value: 67, fill: "var(--chart-2)" },
  { name: "Ready", value: 89, fill: "var(--chart-3)" },
  { name: "Completed", value: 144, fill: "var(--chart-4)" },
];

const orderStatusConfig = {
  value: {
    label: "Orders",
  },
  Pending: {
    label: "Pending",
    color: "var(--chart-1)",
  },
  Processing: {
    label: "Processing",
    color: "var(--chart-2)",
  },
  Ready: {
    label: "Ready",
    color: "var(--chart-3)",
  },
  Completed: {
    label: "Completed",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

// Top Services Data
const topServicesData = [
  {
    service: "express",
    label: "Express Wash",
    revenue: 1_240_000,
    fill: "var(--color-express)",
  },
  {
    service: "dryclean",
    label: "Premium Dry Clean",
    revenue: 980_000,
    fill: "var(--color-dryclean)",
  },
  {
    service: "ironing",
    label: "Ironing Service",
    revenue: 760_000,
    fill: "var(--color-ironing)",
  },
  {
    service: "fabric",
    label: "Fabric Treatment",
    revenue: 640_000,
    fill: "var(--color-fabric)",
  },
  {
    service: "alterations",
    label: "Alterations",
    revenue: 520_000,
    fill: "var(--color-alterations)",
  },
];

const topServicesConfig = {
  revenue: {
    label: "Revenue",
  },
  express: {
    label: "Express Wash",
    color: "var(--chart-1)",
  },
  dryclean: {
    label: "Premium Dry Clean",
    color: "var(--chart-2)",
  },
  ironing: {
    label: "Ironing Service",
    color: "var(--chart-3)",
  },
  fabric: {
    label: "Fabric Treatment",
    color: "var(--chart-4)",
  },
  alterations: {
    label: "Alterations",
    color: "var(--chart-5)",
  },
  label: {
    color: "hsl(var(--primary-foreground))",
  },
} satisfies ChartConfig;

// Inventory Usage Data
const inventoryUsageData = [
  {
    item: "detergent",
    label: "Liquid Detergent",
    usage: 145,
    fill: "var(--chart-1)",
  },
  {
    item: "softener",
    label: "Fabric Softener",
    usage: 120,
    fill: "var(--chart-2)",
  },
  { item: "bleach", label: "Color Bleach", usage: 85, fill: "var(--chart-3)" },
  { item: "starch", label: "Spray Starch", usage: 60, fill: "var(--chart-4)" },
  { item: "bag", label: "Laundry Bags", usage: 45, fill: "var(--chart-5)" },
];

const inventoryUsageConfig = {
  usage: {
    label: "Units Used",
  },
  detergent: {
    label: "Liquid Detergent",
    color: "var(--chart-1)",
  },
  softener: {
    label: "Fabric Softener",
    color: "var(--chart-2)",
  },
  bleach: {
    label: "Color Bleach",
    color: "var(--chart-3)",
  },
  starch: {
    label: "Spray Starch",
    color: "var(--chart-4)",
  },
  bag: {
    label: "Laundry Bags",
    color: "var(--chart-5)",
  },
  label: {
    color: "hsl(var(--primary-foreground))",
  },
} satisfies ChartConfig;

// Bundling Stats Data
const bundlingStatsData = [
  {
    bundle: "family",
    label: "Family Pack",
    sales: 85,
    fill: "var(--chart-1)",
  },
  {
    bundle: "student",
    label: "Student Promo",
    sales: 64,
    fill: "var(--chart-2)",
  },
  {
    bundle: "corporate",
    label: "Office Batch",
    sales: 42,
    fill: "var(--chart-3)",
  },
  {
    bundle: "weekend",
    label: "Weekend Special",
    sales: 38,
    fill: "var(--chart-4)",
  },
  {
    bundle: "shoe",
    label: "Shoe & Bag Combo",
    sales: 25,
    fill: "var(--chart-5)",
  },
];

const bundlingStatsConfig = {
  sales: {
    label: "Sales Count",
  },
  family: {
    label: "Family Pack",
    color: "var(--chart-1)",
  },
  student: {
    label: "Student Promo",
    color: "var(--chart-2)",
  },
  corporate: {
    label: "Office Batch",
    color: "var(--chart-3)",
  },
  weekend: {
    label: "Weekend Special",
    color: "var(--chart-4)",
  },
  shoe: {
    label: "Shoe & Bag Combo",
    color: "var(--chart-5)",
  },
  label: {
    color: "hsl(var(--primary-foreground))",
  },
} satisfies ChartConfig;

// --- RECENT ORDERS DATA ---

// --- HELPER FUNCTIONS ---

interface StatCardProps {
  label: string;
  value: number;
  change?: number;
  subtext?: string;
  valueColor?: string;
}

const StatCard = ({
  label,
  value,
  valueColor = "text-foreground",
}: StatCardProps) => (
  <Card style={cardShadowStyle}>
    <CardHeader className="pb-2">
      <CardDescription>{label}</CardDescription>
      <CardTitle className={cn("font-bold text-2xl", valueColor)}>
        {typeof value === "number" && value > 100_000
          ? `Rp${(value / 1_000_000).toFixed(1)}M`
          : value}
      </CardTitle>
    </CardHeader>
  </Card>
);

interface Props {
  recentOrders: React.ReactNode;
  lowStocks: React.ReactNode;
  date: React.ReactNode;
}

export default function SuperAdminDashboard({
  recentOrders,
  lowStocks,
  date,
}: Props) {
  const totalOrdersCount = React.useMemo(
    () => orderStatusData.reduce((acc, curr) => acc + curr.value, 0),
    []
  );

  //  <div className="mx-auto flex max-w-5xl flex-col gap-5 sm:gap-6">

  return (
    <div className="p-6">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="font-bold text-3xl">Dashboard</h1>
            <p className="mt-1 text-muted-foreground">
              Welcome back! Here&apos;s your business overview.
            </p>
          </div>

          {/* Date Range Picker */}
          {date}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            label="Total Revenue"
            value={dashboardMetrics.totalRevenue}
            valueColor="text-primary"
          />
          <StatCard label="Total Orders" value={dashboardMetrics.totalOrders} />
          <StatCard
            label="Active Members"
            subtext="Registered loyalty members"
            value={dashboardMetrics.activeMembers}
          />
          <StatCard
            label="Staff Members"
            subtext="Across all branches"
            value={dashboardMetrics.totalStaff}
          />
        </div>

        {/* ROW 1: Order Status, Delivery Status, Low Stock */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Order Status Distribution (Donut Chart) */}
          <Card className="flex flex-col" style={cardShadowStyle}>
            <CardHeader className="items-center pb-0">
              <CardTitle>Order Status Distribution</CardTitle>
              <CardDescription>
                Breakdown of current orders by status
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
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
                    data={orderStatusData}
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
                                Orders
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
              <div className="text-muted-foreground leading-none">
                Showing distribution across all current statuses
              </div>
            </CardFooter>
          </Card>

          {/* Low Stock Alert - Clickable Links */}
          {lowStocks}
        </div>

        {/* ROW 2: Top Services, Inventory Usage, Bundling */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Top Services */}
          <Card style={cardShadowStyle}>
            <CardHeader>
              <CardTitle>Top Services</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={topServicesConfig}>
                <BarChart
                  accessibilityLayer
                  data={topServicesData}
                  layout="vertical"
                  margin={{
                    right: 16,
                  }}
                >
                  <CartesianGrid horizontal={false} />
                  <YAxis
                    axisLine={false}
                    dataKey="service"
                    hide
                    tickFormatter={(value) => value.slice(0, 3)}
                    tickLine={false}
                    tickMargin={10}
                    type="category"
                  />
                  <XAxis dataKey="revenue" hide type="number" />
                  <ChartTooltip
                    content={<ChartTooltipContent indicator="line" />}
                    cursor={false}
                  />
                  <Bar dataKey="revenue" layout="vertical" radius={4}>
                    <LabelList
                      className="fill-white"
                      dataKey="label"
                      fontSize={12}
                      offset={8}
                      position="insideLeft"
                    />
                    <LabelList
                      className="fill-foreground"
                      dataKey="revenue"
                      fontSize={12}
                      formatter={(value: number) =>
                        `Rp${(value / 1000).toFixed(0)}k`
                      }
                      offset={8}
                      position="right"
                    />
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="text-muted-foreground leading-none">
                Showing top performing services based on revenue
              </div>
            </CardFooter>
          </Card>

          {/* Inventory Usage */}
          <Card style={cardShadowStyle}>
            <CardHeader>
              <CardTitle>Inventory Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={inventoryUsageConfig}>
                <BarChart
                  accessibilityLayer
                  data={inventoryUsageData}
                  layout="vertical"
                  margin={{ right: 16 }}
                >
                  <CartesianGrid horizontal={false} />
                  <YAxis
                    axisLine={false}
                    dataKey="item"
                    hide
                    tickLine={false}
                    tickMargin={10}
                    type="category"
                  />
                  <XAxis dataKey="usage" hide type="number" />
                  <ChartTooltip
                    content={<ChartTooltipContent indicator="line" />}
                    cursor={false}
                  />
                  <Bar dataKey="usage" layout="vertical" radius={4}>
                    <LabelList
                      className="fill-white"
                      dataKey="label"
                      fontSize={12}
                      offset={8}
                      position="insideLeft"
                    />
                    <LabelList
                      className="fill-foreground"
                      dataKey="usage"
                      fontSize={12}
                      offset={8}
                      position="right"
                    />
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="text-muted-foreground leading-none">
                Track consumption of key inventory items
              </div>
            </CardFooter>
          </Card>

          {/* Bundling Stats */}
          <Card style={cardShadowStyle}>
            <CardHeader>
              <CardTitle>Bundling Performance</CardTitle>
            </CardHeader>

            <CardContent>
              <ChartContainer config={bundlingStatsConfig}>
                <BarChart
                  accessibilityLayer
                  data={bundlingStatsData}
                  layout="vertical"
                  margin={{ right: 16 }}
                >
                  <CartesianGrid horizontal={false} />
                  <YAxis
                    axisLine={false}
                    dataKey="bundle"
                    hide
                    tickLine={false}
                    tickMargin={10}
                    type="category"
                  />
                  <XAxis dataKey="sales" hide type="number" />
                  <ChartTooltip
                    content={<ChartTooltipContent indicator="line" />}
                    cursor={false}
                  />
                  <Bar dataKey="sales" layout="vertical" radius={4}>
                    <LabelList
                      className="fill-white"
                      dataKey="label"
                      fontSize={12}
                      offset={8}
                      position="insideLeft"
                    />
                    <LabelList
                      className="fill-foreground"
                      dataKey="sales"
                      fontSize={12}
                      offset={8}
                      position="right"
                    />
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="text-muted-foreground leading-none">
                Performance tracking for bundled offers
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* ROW 4: Recent Orders */}
        {recentOrders}
      </div>
    </div>
  );
}
