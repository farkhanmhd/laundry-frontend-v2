/** biome-ignore-all lint/suspicious/noExplicitAny: temporary */
"use client";

import {
  AlertCircle,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Truck,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Mock data based on database schema
const dashboardMetrics = {
  totalRevenue: 4_850_000,
  totalOrders: 324,
  activeMembers: 156,
  totalStaff: 12,
  revenueGrowth: 12.5,
  orderGrowth: 8.2,
};

const orderStatusData = [
  { name: "Pending", value: 24, fill: "hsl(var(--chart-1))" },
  { name: "Processing", value: 67, fill: "hsl(var(--chart-2))" },
  { name: "Ready", value: 89, fill: "hsl(var(--chart-3))" },
  { name: "Completed", value: 144, fill: "hsl(var(--chart-4))" },
];

const revenueData = [
  { month: "Jan", revenue: 320_000, orders: 24 },
  { month: "Feb", revenue: 380_000, orders: 28 },
  { month: "Mar", revenue: 420_000, orders: 35 },
  { month: "Apr", revenue: 450_000, orders: 41 },
  { month: "May", revenue: 520_000, orders: 48 },
  { month: "Jun", revenue: 480_000, orders: 44 },
  { month: "Jul", revenue: 550_000, orders: 51 },
  { month: "Aug", revenue: 650_000, orders: 58 },
];

const topServices = [
  { name: "Express Wash", revenue: 1_240_000, orders: 85 },
  { name: "Premium Dry Clean", revenue: 980_000, orders: 56 },
  { name: "Ironing Service", revenue: 760_000, orders: 92 },
  { name: "Fabric Treatment", revenue: 640_000, orders: 38 },
  { name: "Alterations", revenue: 520_000, orders: 31 },
];

const deliveryStatusData = [
  { name: "Requested", value: 12 },
  { name: "Assigned", value: 18 },
  { name: "In Progress", value: 24 },
  { name: "Completed", value: 156 },
  { name: "Cancelled", value: 4 },
];

const recentOrders = [
  {
    id: "o-12345",
    customer: "John Doe",
    amount: 125_000,
    status: "completed",
    date: "2024-08-15",
  },
  {
    id: "o-12344",
    customer: "Jane Smith",
    amount: 85_000,
    status: "ready",
    date: "2024-08-15",
  },
  {
    id: "o-12343",
    customer: "Mike Johnson",
    amount: 210_000,
    status: "processing",
    date: "2024-08-14",
  },
  {
    id: "o-12342",
    customer: "Sarah Williams",
    amount: 95_000,
    status: "pending",
    date: "2024-08-14",
  },
  {
    id: "o-12341",
    customer: "Tom Brown",
    amount: 145_000,
    status: "completed",
    date: "2024-08-13",
  },
];

const lowStockItems = [
  { id: "p-001", name: "Laundry Detergent", current: 8, safety: 20 },
  { id: "p-002", name: "Fabric Softener", current: 5, safety: 15 },
  { id: "p-003", name: "Stain Remover", current: 12, safety: 25 },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "ready":
      return "bg-blue-100 text-blue-800";
    case "processing":
      return "bg-yellow-100 text-yellow-800";
    case "pending":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const StatCard = ({ icon: Icon, label, value, change }: any) => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-medium text-muted-foreground text-sm">{label}</p>
          <p className="mt-2 font-bold text-2xl">
            {typeof value === "number" && value > 100_000
              ? `Rp${(value / 1_000_000).toFixed(1)}M`
              : value}
          </p>
          {change && (
            <p className="mt-2 flex items-center gap-1 text-green-600 text-xs">
              <TrendingUp className="h-3 w-3" />
              {change}% from last month
            </p>
          )}
        </div>
        <Icon className="h-8 w-8 text-primary opacity-50" />
      </div>
    </CardContent>
  </Card>
);

export default function SuperAdminDashboard() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-bold text-3xl">Superadmin Dashboard</h1>
          <p className="mt-1 text-muted-foreground">
            Welcome back! Here's your business overview.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            change={dashboardMetrics.revenueGrowth}
            icon={DollarSign}
            label="Total Revenue"
            value={dashboardMetrics.totalRevenue}
          />
          <StatCard
            change={dashboardMetrics.orderGrowth}
            icon={ShoppingCart}
            label="Total Orders"
            value={dashboardMetrics.totalOrders}
          />
          <StatCard
            icon={Users}
            label="Active Members"
            value={dashboardMetrics.activeMembers}
          />
          <StatCard
            icon={Users}
            label="Staff Members"
            value={dashboardMetrics.totalStaff}
          />
        </div>

        {/* Charts Section */}
        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Revenue and Orders Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue & Orders Trend</CardTitle>
              <CardDescription>
                Monthly performance over the last 8 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer height={300} width="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis orientation="right" yAxisId="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    dataKey="revenue"
                    name="Revenue (Rp)"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    type="monotone"
                    yAxisId="left"
                  />
                  <Line
                    dataKey="orders"
                    name="Orders"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    type="monotone"
                    yAxisId="right"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Order Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Order Status Distribution</CardTitle>
              <CardDescription>
                Breakdown of current orders by status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer height={300} width="100%">
                <PieChart>
                  <Pie
                    cx="50%"
                    cy="50%"
                    data={orderStatusData}
                    dataKey="value"
                    fill="#8884d8"
                    label={({ name, value }) => `${name}: ${value}`}
                    labelLine={false}
                    outerRadius={100}
                  >
                    {orderStatusData.map((entry) => (
                      <Cell fill={entry.fill} key={`cell-${entry.name}`} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Top Services */}
        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Top Services</CardTitle>
              <CardDescription>
                Best performing services by revenue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer height={300} width="100%">
                <BarChart data={topServices} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={120} />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="hsl(var(--chart-1))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Delivery Status */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Status</CardTitle>
              <CardDescription>Current delivery operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deliveryStatusData.map((item) => (
                  <div
                    className="flex items-center justify-between"
                    key={item.name}
                  >
                    <div className="flex items-center gap-3">
                      <Truck className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium text-sm">{item.name}</span>
                    </div>
                    <Badge variant="outline">{item.value}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders & Low Stock */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest orders in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    className="flex items-center justify-between border-b pb-3 last:border-0"
                    key={order.id}
                  >
                    <div>
                      <p className="font-medium text-sm">{order.customer}</p>
                      <p className="text-muted-foreground text-xs">
                        {order.id} • {order.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">
                        Rp{(order.amount / 1000).toFixed(0)}K
                      </p>
                      <Badge
                        className={getStatusColor(order.status)}
                        variant="outline"
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Low Stock Alert */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                Low Stock Items
              </CardTitle>
              <CardDescription>Items below safety stock level</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lowStockItems.map((item) => (
                  <div
                    className="rounded-lg border border-orange-200 bg-orange-50 p-3"
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
                    <div className="mt-2 h-2 w-full rounded-full bg-orange-200">
                      <div
                        className="h-2 rounded-full bg-orange-600"
                        style={{
                          width: `${(item.current / item.safety) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
