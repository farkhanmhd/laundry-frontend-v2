"use client";

import {
  ArrowDownCircle,
  ArrowUpCircle,
  MapPin,
  Package,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---

const dailyStats = {
  ordersPending: 12,
  ordersProcessing: 45,
  pickupsPending: 5,
  deliveriesPending: 8,
};

// Dates updated to ISO string format for UTC conversion
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

const pickupRequests = [
  {
    id: "dlv-p1",
    customer: "Citra Lestari",
    address: "Jl. Merpati No. 45, Medan",
    time: "10:30 AM",
    status: "requested",
  },
  {
    id: "dlv-p2",
    customer: "Coffee Shop Kenangan",
    address: "Jl. Pattimura (Staff Entrance)",
    time: "11:45 AM",
    status: "assigned",
  },
  {
    id: "dlv-p3",
    customer: "Rina Wati",
    address: "Komplek Asia Mega Mas, Block DD",
    time: "01:00 PM",
    status: "requested",
  },
];

const deliveryRequests = [
  {
    id: "dlv-d1",
    customer: "David Chen",
    address: "Apartemen Grand City, Tower A",
    time: "02:00 PM",
    status: "assigned",
  },
  {
    id: "dlv-d2",
    customer: "Hotel Emerald (Lobby)",
    address: "Jl. Putri Hijau No. 10",
    time: "03:30 PM",
    status: "requested",
  },
];

// Helper to filter and slice data
const getFilteredOrders = (status: string) => {
  if (status === "all") {
    return recentOrders.slice(0, 10);
  }
  return recentOrders.filter((o) => o.status === status).slice(0, 10);
};

// Maps status to valid shadcn badge variants
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

// Helper to format date to UTC string
const formatToUTC = (dateString: string) => new Date(dateString).toDateString();

export default function EmployeeDashboard() {
  return (
    <div className="min-h-screen p-6">
      <div className="flex flex-col gap-6">
        {/* Header Section */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="font-bold text-3xl text-foreground tracking-tight">
              Operations Desk
            </h1>
          </div>
          <div className="flex gap-3">
            <Link className={cn(buttonVariants())} href="/pos">
              <Plus className="h-4 w-4" />
              New Order
            </Link>
          </div>
        </div>

        {/* Quick Action Stats */}
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          <Card
            style={{
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}
          >
            <CardHeader className="pb-2">
              <CardDescription>Orders Pending</CardDescription>
              <CardTitle className="font-bold text-4xl text-destructive">
                {dailyStats.ordersPending}
              </CardTitle>
            </CardHeader>
            <CardFooter className="pt-0 text-muted-foreground text-sm">
              Waiting for Payment
            </CardFooter>
          </Card>

          <Card
            style={{
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}
          >
            <CardHeader className="pb-2">
              <CardDescription>In Processing</CardDescription>
              <CardTitle className="font-bold text-4xl text-primary">
                {dailyStats.ordersProcessing}
              </CardTitle>
            </CardHeader>
            <CardFooter className="pt-0 text-muted-foreground text-sm">
              Operations in progress
            </CardFooter>
          </Card>

          <Card
            style={{
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}
          >
            <CardHeader className="pb-2">
              <CardDescription>Pickup Requests</CardDescription>
              <CardTitle className="font-bold text-4xl text-foreground">
                {dailyStats.pickupsPending}
              </CardTitle>
            </CardHeader>
            <CardFooter className="pt-0 text-muted-foreground text-sm">
              To be collected
            </CardFooter>
          </Card>

          <Card
            style={{
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}
          >
            <CardHeader className="pb-2">
              <CardDescription>Delivery Requests</CardDescription>
              <CardTitle className="font-bold text-4xl text-foreground">
                {dailyStats.deliveriesPending}
              </CardTitle>
            </CardHeader>
            <CardFooter className="pt-0 text-muted-foreground text-sm">
              Ready to ship
            </CardFooter>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Pickup Requests */}
          <Card
            style={{
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base text-foreground">
                <ArrowDownCircle className="h-5 w-5 text-primary" />
                Pickup Requests
              </CardTitle>
              <CardDescription>Incoming laundry from customers</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {pickupRequests.map((item) => (
                <div
                  className="flex items-start justify-between border-border border-b pb-3 last:border-0 last:pb-0"
                  key={item.id}
                >
                  <div className="grid gap-1">
                    <p className="font-medium text-foreground text-sm">
                      {item.customer}
                    </p>
                    <div className="flex items-start gap-1.5 text-muted-foreground text-xs">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      <span className="line-clamp-2">{item.address}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge
                        className="h-5 px-1.5 font-normal text-[10px]"
                        variant="secondary"
                      >
                        {item.time}
                      </Badge>
                      <Badge
                        className="h-5 px-2 text-[10px]"
                        variant={getBadgeVariant(item.status)}
                      >
                        {item.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
              <Button className="mt-2 w-full" variant="outline">
                View All Pickups
              </Button>
            </CardContent>
          </Card>

          {/* Delivery Requests */}
          <Card
            style={{
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base text-foreground">
                <ArrowUpCircle className="h-5 w-5 text-primary" />
                Delivery Requests
              </CardTitle>
              <CardDescription>Outgoing finished orders</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {deliveryRequests.map((item) => (
                <div
                  className="flex items-start justify-between border-border border-b pb-3 last:border-0 last:pb-0"
                  key={item.id}
                >
                  <div className="grid gap-1">
                    <p className="font-medium text-foreground text-sm">
                      {item.customer}
                    </p>
                    <div className="flex items-start gap-1.5 text-muted-foreground text-xs">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      <span className="line-clamp-2">{item.address}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge
                        className="h-5 px-1.5 font-normal text-[10px]"
                        variant="secondary"
                      >
                        {item.time}
                      </Badge>
                      <Badge
                        className="h-5 px-2 text-[10px]"
                        variant={getBadgeVariant(item.status)}
                      >
                        {item.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
              <Button className="mt-2 w-full" variant="outline">
                View All Deliveries
              </Button>
            </CardContent>
          </Card>
        </div>

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
              {/* Uniform styling for Tabs: Primary color when active */}
              <TabsList className="h-auto w-full flex-wrap justify-start gap-2 bg-transparent p-0">
                {["All", "Pending", "Processing", "Ready", "Completed"].map(
                  (status) => (
                    <TabsTrigger
                      className="cursor-pointer border border-transparent bg-muted/60 data-[state=active]:border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:bg-background dark:data-[state=active]:bg-primary"
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
                  <TabsContent className="mt-0 space-y-1" key={tab} value={tab}>
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
                                <p className="font-medium text-muted-foreground text-sm uppercase">
                                  {order.id}
                                </p>
                                <p className="mt-1 text-muted-foreground/70 text-xs">
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
  );
}
