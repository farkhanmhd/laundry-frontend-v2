"use client";

import { ArrowDownCircle, ArrowUpCircle, MapPin, Plus } from "lucide-react";
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
import { cardShadowStyle, cn } from "@/lib/utils";

// --- MOCK DATA ---

const operationalMetrics = {
  ordersPending: 12,
  ordersProcessing: 45,
  pickupsPending: 5,
  deliveriesPending: 8,
};

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
    status: "in_progress",
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
    status: "in_progress",
  },
  {
    id: "dlv-d2",
    customer: "Hotel Emerald (Lobby)",
    address: "Jl. Putri Hijau No. 10",
    time: "03:30 PM",
    status: "requested",
  },
];

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
type Props = {
  recentOrders: React.ReactNode;
};

export default function EmployeeDashboard({ recentOrders }: Props) {
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
          <Card style={cardShadowStyle}>
            <CardHeader className="pb-2">
              <CardDescription>Orders Pending</CardDescription>
              <CardTitle className="font-bold text-4xl text-destructive">
                {operationalMetrics.ordersPending}
              </CardTitle>
            </CardHeader>
            <CardFooter className="pt-0 text-muted-foreground text-sm">
              Waiting for Payment
            </CardFooter>
          </Card>

          <Card style={cardShadowStyle}>
            <CardHeader className="pb-2">
              <CardDescription>In Processing</CardDescription>
              <CardTitle className="font-bold text-4xl text-primary">
                {operationalMetrics.ordersProcessing}
              </CardTitle>
            </CardHeader>
            <CardFooter className="pt-0 text-muted-foreground text-sm">
              Operations in progress
            </CardFooter>
          </Card>

          <Card style={cardShadowStyle}>
            <CardHeader className="pb-2">
              <CardDescription>Pickup Requests</CardDescription>
              <CardTitle className="font-bold text-4xl text-foreground">
                {operationalMetrics.pickupsPending}
              </CardTitle>
            </CardHeader>
            <CardFooter className="pt-0 text-muted-foreground text-sm">
              To be collected
            </CardFooter>
          </Card>

          <Card style={cardShadowStyle}>
            <CardHeader className="pb-2">
              <CardDescription>Delivery Requests</CardDescription>
              <CardTitle className="font-bold text-4xl text-foreground">
                {operationalMetrics.deliveriesPending}
              </CardTitle>
            </CardHeader>
            <CardFooter className="pt-0 text-muted-foreground text-sm">
              Ready to ship
            </CardFooter>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Pickup Requests */}
          <Card style={cardShadowStyle}>
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
          <Card style={cardShadowStyle}>
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

        {recentOrders}
      </div>
    </div>
  );
}
