"use client";

import { format } from "date-fns";
import { AlertCircle, Calendar as CalendarIcon, Package } from "lucide-react";
import Link from "next/link";
import React from "react";
import type { DateRange } from "react-day-picker";
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
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// --- DASHBOARD METRICS ---
const dashboardMetrics = {
  totalRevenue: 4_850_000,
  totalOrders: 324,
  activeMembers: 156,
  totalStaff: 12,
  revenueGrowth: 12.5,
  orderGrowth: 8.2,
};

// --- CHART DATA ---
const revenueData = [
  { month: "January", revenue: 320_000, orders: 24 },
  { month: "February", revenue: 380_000, orders: 28 },
  { month: "March", revenue: 420_000, orders: 35 },
  { month: "April", revenue: 450_000, orders: 41 },
  { month: "May", revenue: 520_000, orders: 48 },
  { month: "June", revenue: 480_000, orders: 44 },
  { month: "July", revenue: 550_000, orders: 51 },
  { month: "August", revenue: 650_000, orders: 58 },
];

const revenueTrendConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

const ordersTrendConfig = {
  orders: {
    label: "Orders",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

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
const recentOrders = [
  {
    id: "o-x9d2a",
    customer: "Alice Johnson",
    total: 125_000,
    status: "pending",
    date: "2025-12-10T03:30:00Z",
  },
  {
    id: "o-k3m9p",
    customer: "Budi Santoso",
    total: 85_000,
    status: "processing",
    date: "2025-12-10T02:15:00Z",
  },
  {
    id: "o-p4l1q",
    customer: "Sarah Lee",
    total: 45_000,
    status: "ready",
    date: "2025-12-09T09:00:00Z",
  },
  {
    id: "o-m8n2b",
    customer: "Rahman Hakim",
    total: 210_000,
    status: "completed",
    date: "2025-12-09T07:30:00Z",
  },
  {
    id: "o-j7k9x",
    customer: "Diana Prince",
    total: 150_000,
    status: "processing",
    date: "2025-12-09T04:00:00Z",
  },
  {
    id: "o-992ka",
    customer: "Michael Chen",
    total: 320_000,
    status: "pending",
    date: "2025-12-09T03:00:00Z",
  },
  {
    id: "o-112lp",
    customer: "Jessica Wong",
    total: 90_000,
    status: "ready",
    date: "2025-12-09T02:30:00Z",
  },
  {
    id: "o-334md",
    customer: "Tom Holland",
    total: 110_000,
    status: "completed",
    date: "2025-12-08T14:00:00Z",
  },
  {
    id: "o-556nq",
    customer: "Robert Down",
    total: 55_000,
    status: "processing",
    date: "2025-12-08T11:00:00Z",
  },
  {
    id: "o-778pr",
    customer: "Chris Evans",
    total: 180_000,
    status: "pending",
    date: "2025-12-08T09:00:00Z",
  },
];

const lowStockItems = [
  { id: "p-001", name: "Laundry Detergent", current: 8, safety: 20 },
  { id: "p-002", name: "Fabric Softener", current: 5, safety: 15 },
  { id: "p-003", name: "Stain Remover", current: 12, safety: 25 },
];

// --- HELPER FUNCTIONS ---

const getFilteredOrders = (status: string) => {
  if (status === "all") {
    return recentOrders.slice(0, 10);
  }
  return recentOrders.filter((o) => o.status === status).slice(0, 10);
};

const getBadgeVariant = (
  status: string
): "default" | "secondary" | "outline" | "destructive" => {
  switch (status) {
    case "pending":
    case "requested":
      return "secondary";
    case "processing":
    case "assigned":
      return "default";
    case "ready":
    case "completed":
      return "outline";
    default:
      return "secondary";
  }
};

const formatToUTC = (dateString: string) => new Date(dateString).toUTCString();

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
  <Card
    style={{
      boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    }}
  >
    <CardHeader className="pb-2">
      <CardDescription>{label}</CardDescription>
      <CardTitle className={cn("font-bold text-4xl", valueColor)}>
        {typeof value === "number" && value > 100_000
          ? `Rp${(value / 1_000_000).toFixed(1)}M`
          : value}
      </CardTitle>
    </CardHeader>
  </Card>
);

export default function SuperAdminDashboard() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });

  const totalOrdersCount = React.useMemo(
    () => orderStatusData.reduce((acc, curr) => acc + curr.value, 0),
    []
  );

  const dateState = () => {
    if (date?.from && date.to) {
      return "range";
    }

    if (date?.from) {
      return "single";
    }

    return "empty";
  };

  const dateDisplay = {
    empty: <span>Pick a date</span>,
    single: date?.from && format(date.from, "LLL dd, y"),
    range: date?.from && date?.to && (
      <>
        {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
      </>
    ),
  };

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
          <div className="grid gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className={cn(
                    "w-[300px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                  id="date"
                  variant={"outline"}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateDisplay[dateState()]}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-auto p-0">
                <Calendar
                  autoFocus
                  defaultMonth={date?.from}
                  mode="range"
                  numberOfMonths={2}
                  onSelect={setDate}
                  selected={date}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            change={dashboardMetrics.revenueGrowth}
            label="Total Revenue"
            value={dashboardMetrics.totalRevenue}
            valueColor="text-primary"
          />
          <StatCard
            change={dashboardMetrics.orderGrowth}
            label="Total Orders"
            value={dashboardMetrics.totalOrders}
          />
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
          <Card
            className="flex flex-col"
            style={{
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}
          >
            <CardHeader className="items-center pb-0">
              <CardTitle>Order Status Distribution</CardTitle>
              <CardDescription>
                Breakdown of current orders by status
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                className="mx-auto aspect-square max-h-[300px]"
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
          <Card
            style={{
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  Low Stock Inventory
                </CardTitle>
                <Link
                  className={cn(buttonVariants({ variant: "secondary" }))}
                  href="/inventories"
                >
                  View All Inventories
                </Link>
              </div>
              <CardDescription>Items below safety stock level</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {lowStockItems.map((item) => (
                  <Link
                    className="block rounded-lg border border-border p-3 transition-all hover:border-primary hover:bg-muted/50"
                    href={`/inventories/${item.id}`}
                    key={item.id}
                  >
                    <div className="mb-2 flex items-start justify-between">
                      <p className="font-medium text-sm">{item.name}</p>
                      <Badge variant="destructive">Alert</Badge>
                    </div>
                    <div className="flex justify-between text-muted-foreground text-xs">
                      <span>Current: {item.current}</span>
                      <span>Safety Stock: {item.safety}</span>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full border bg-muted">
                      <div
                        className="h-2 rounded-full bg-destructive"
                        style={{
                          width: `${(item.current / item.safety) * 100}%`,
                        }}
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ROW 2: Top Services, Inventory Usage, Bundling */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Top Services */}
          <Card
            style={{
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}
          >
            <CardHeader>
              <CardTitle>Top Services</CardTitle>
              <CardDescription>
                Best performing services by revenue
              </CardDescription>
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
          <Card style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}>
            <CardHeader>
              <CardTitle>Inventory Usage</CardTitle>
              <CardDescription>Most used items this month</CardDescription>
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
          <Card style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}>
            <CardHeader>
              <CardTitle>Bundling Performance</CardTitle>
              <CardDescription>Best selling bundles</CardDescription>
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

        {/* ROW 3: Revenue & Orders Trends */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Revenue Trend Chart */}
          <Card style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Monthly revenue performance</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={revenueTrendConfig}>
                <BarChart
                  accessibilityLayer
                  data={revenueData}
                  margin={{
                    top: 20,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    axisLine={false}
                    dataKey="month"
                    tickFormatter={(value) => value.slice(0, 3)}
                    tickLine={false}
                    tickMargin={10}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent hideLabel />}
                    cursor={false}
                  />
                  <Bar dataKey="revenue" fill="var(--color-revenue)" radius={8}>
                    <LabelList
                      className="fill-foreground"
                      fontSize={12}
                      formatter={(value: number) =>
                        `${(value / 1000).toFixed(0)}k`
                      }
                      offset={12}
                      position="top"
                    />
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="text-muted-foreground leading-none">
                Showing total revenue for the last 8 months
              </div>
            </CardFooter>
          </Card>

          {/* Orders Trend Chart */}
          <Card style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}>
            <CardHeader>
              <CardTitle>Orders Trend</CardTitle>
              <CardDescription>Monthly orders performance</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={ordersTrendConfig}>
                <BarChart
                  accessibilityLayer
                  data={revenueData} // Using same dataset for demo
                  margin={{
                    top: 20,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    axisLine={false}
                    dataKey="month"
                    tickFormatter={(value) => value.slice(0, 3)}
                    tickLine={false}
                    tickMargin={10}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent hideLabel />}
                    cursor={false}
                  />
                  <Bar dataKey="orders" fill="var(--color-orders)" radius={8}>
                    <LabelList
                      className="fill-foreground"
                      fontSize={12}
                      offset={12}
                      position="top"
                    />
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="text-muted-foreground leading-none">
                Showing total orders for the last 8 months
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* ROW 4: Recent Orders */}
        <div className="grid grid-cols-1 gap-6">
          <Card
            className="flex h-full flex-col"
            style={{
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}
          >
            <Tabs className="flex w-full flex-1 flex-col" defaultValue="all">
              <CardHeader className="flex flex-col gap-4 pb-4">
                <div className="flex w-full items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>
                      Overview of latest transactions
                    </CardDescription>
                  </div>
                  <Button asChild size="sm" variant="outline">
                    <Link href="/orders">View All Orders</Link>
                  </Button>
                </div>
                {/* FIX: h-auto and flex-wrap ensure Tabs wrap correctly and don't overlap list content */}
                <TabsList className="flex h-auto w-full flex-wrap justify-start gap-2 bg-transparent p-0">
                  {["All", "Pending", "Processing", "Ready", "Completed"].map(
                    (status) => (
                      <TabsTrigger
                        className="h-9 border border-transparent bg-muted/50 px-4 py-2 data-[state=active]:border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:bg-background dark:data-[state=active]:bg-primary"
                        key={status}
                        value={status.toLowerCase()}
                      >
                        {status}
                      </TabsTrigger>
                    )
                  )}
                </TabsList>
              </CardHeader>

              <CardContent className="flex-1">
                {["all", "pending", "processing", "ready", "completed"].map(
                  (tab) => (
                    <TabsContent
                      className="mt-0 space-y-1"
                      key={tab}
                      value={tab}
                    >
                      {getFilteredOrders(tab).length === 0 ? (
                        <div className="flex h-32 items-center justify-center text-muted-foreground text-sm">
                          No orders found for this status.
                        </div>
                      ) : (
                        getFilteredOrders(tab).map((order) => (
                          <Link
                            className="group block"
                            href={`/orders/${order.id}`}
                            key={order.id}
                          >
                            <div className="flex items-center justify-between rounded-lg border border-border p-4 transition-all hover:border-primary">
                              <div className="flex items-start gap-4">
                                <div className="mt-1 rounded-full bg-secondary p-2 text-secondary-foreground transition-colors group-hover:bg-background group-hover:text-primary">
                                  <Package className="h-5 w-5" />
                                </div>
                                <div>
                                  <p className="font-semibold text-foreground transition-colors group-hover:text-primary">
                                    {order.customer}
                                  </p>
                                  <p className="text-muted-foreground text-sm uppercase">
                                    {order.id}
                                  </p>
                                  <p className="mt-1 text-muted-foreground/70 text-sm">
                                    {formatToUTC(order.date)}
                                  </p>
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <p className="font-medium text-foreground text-sm">
                                  Rp{order.total.toLocaleString()}
                                </p>
                                <Badge variant={getBadgeVariant(order.status)}>
                                  {order.status.charAt(0).toUpperCase() +
                                    order.status.slice(1)}
                                </Badge>
                              </div>
                            </div>
                          </Link>
                        ))
                      )}
                    </TabsContent>
                  )
                )}
              </CardContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}
