/** biome-ignore-all lint/suspicious/noExplicitAny: temporary */
"use client";

import { Gift, ShoppingCart, TrendingUp, Truck } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CustomerDashboard() {
  const recentOrders = [
    { id: "o-12345", status: "completed", amount: 125_000, date: "2025-11-10" },
    { id: "o-12346", status: "ready", amount: 85_000, date: "2025-11-11" },
  ];

  const activeDeliveries = [
    {
      id: "dlv-002",
      type: "dropoff",
      status: "in_progress",
      date: "2025-11-11",
    },
  ];

  const statusColors = {
    completed: "bg-green-100 text-green-800",
    ready: "bg-blue-100 text-blue-800",
    processing: "bg-yellow-100 text-yellow-800",
    pending: "bg-orange-100 text-orange-800",
    in_progress: "bg-blue-100 text-blue-800",
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 font-bold text-4xl">Welcome Back!</h1>
          <p className="text-muted-foreground">
            Here's your laundry service dashboard
          </p>
        </div>

        {/* Quick Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            description="All time"
            icon={ShoppingCart}
            label="Total Orders"
            value="24"
          />
          <StatCard
            description="In progress"
            icon={Truck}
            label="Active Deliveries"
            value="1"
          />
          <StatCard
            description="Ready to redeem"
            icon={Gift}
            label="Loyalty Points"
            value="2,450"
          />
          <StatCard
            description="Top tier member"
            icon={TrendingUp}
            label="Member Tier"
            value="Platinum"
          />
        </div>

        {/* Quick Actions */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/customer/menu">
                <Button
                  className="w-full justify-start bg-transparent"
                  variant="outline"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  New Order
                </Button>
              </Link>
              <Link href="/customer/my-orders">
                <Button
                  className="w-full justify-start bg-transparent"
                  variant="outline"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  View My Orders
                </Button>
              </Link>
              <Link href="/customer/my-deliveries">
                <Button
                  className="w-full justify-start bg-transparent"
                  variant="outline"
                >
                  <Truck className="mr-2 h-4 w-4" />
                  Track Deliveries
                </Button>
              </Link>
              <Link href="/customer/loyalty">
                <Button
                  className="w-full justify-start bg-transparent"
                  variant="outline"
                >
                  <Gift className="mr-2 h-4 w-4" />
                  Loyalty Rewards
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Your account information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-muted-foreground text-sm">Name</p>
                <p className="font-medium">Richi Kusuma</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Member ID</p>
                <p className="font-medium font-mono">c-001</p>
              </div>
              <Link href="/customer/profile">
                <Button className="w-full bg-transparent" variant="outline">
                  Edit Profile
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Your latest laundry orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <Link href={`/customer/my-orders/${order.id}`} key={order.id}>
                    <div className="flex cursor-pointer items-center justify-between rounded-lg border p-3 transition hover:bg-accent">
                      <div>
                        <p className="font-medium font-mono text-sm">
                          {order.id}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {new Date(order.date).toLocaleDateString("id-ID")}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          Rp{" "}
                          {new Intl.NumberFormat("id-ID").format(order.amount)}
                        </p>
                        <Badge
                          className={
                            statusColors[
                              order.status as keyof typeof statusColors
                            ]
                          }
                        >
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <Link className="mt-4 block" href="/customer/my-orders">
                <Button className="w-full bg-transparent" variant="outline">
                  View All Orders
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Active Deliveries */}
          <Card>
            <CardHeader>
              <CardTitle>Active Deliveries</CardTitle>
              <CardDescription>Your ongoing deliveries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeDeliveries.length > 0 ? (
                  activeDeliveries.map((delivery) => (
                    <Link href="#" key={delivery.id}>
                      <div className="flex cursor-pointer items-center justify-between rounded-lg border p-3 transition hover:bg-accent">
                        <div>
                          <p className="font-medium font-mono text-sm">
                            {delivery.id}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            {delivery.type === "pickup" ? "Pickup" : "Dropoff"}
                          </p>
                        </div>
                        <Badge
                          className={
                            statusColors[
                              delivery.status as keyof typeof statusColors
                            ]
                          }
                        >
                          {delivery.status === "in_progress"
                            ? "In Progress"
                            : delivery.status}
                        </Badge>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">
                    No active deliveries
                  </p>
                )}
              </div>
              <Link className="mt-4 block" href="/customer/my-deliveries">
                <Button className="w-full bg-transparent" variant="outline">
                  View All Deliveries
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, description }: any) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-medium text-muted-foreground text-sm">{label}</p>
            <p className="mt-2 font-bold text-2xl">{value}</p>
            <p className="mt-1 text-muted-foreground text-xs">{description}</p>
          </div>
          <Icon className="h-8 w-8 text-primary opacity-50" />
        </div>
      </CardContent>
    </Card>
  );
}
