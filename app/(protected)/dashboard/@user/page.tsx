"use client";

import { MapPin, Ticket, Truck, Wallet } from "lucide-react";
import Link from "next/link";
import { DeliveriesItem } from "@/components/features/deliveries/deliveries-item";
import { OrderListItem } from "@/components/features/orders/order-list-item";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Client } from "@/components/utils/client";
import { cardShadowStyle, cn, formatDate } from "@/lib/utils";

// --- MOCK DATA ---

const userProfile = {
  name: "Alice Johnson",
  phone: "+628123897234",
  points: 1250,
};

const recentOrders = [
  {
    id: "o-x9d2a",
    status: "processing",
    total: 125_000,
    itemsCount: 3,
    service: "Express Wash",
    createdAt: "2025-12-10T08:30:00Z",
  },
  {
    id: "o-k3m9p",
    status: "pending",
    total: 85_000,
    itemsCount: 1,
    service: "Premium Dry Clean",
    createdAt: "2025-12-11T09:15:00Z",
  },
  {
    id: "o-j8l4x",
    status: "completed",
    total: 210_000,
    itemsCount: 4,
    service: "Bedding Set Wash",
    createdAt: "2025-12-05T14:20:00Z",
  },
];

const recentDeliveries = [
  {
    id: "dlv-7m2q",
    orderId: "o-x9d2a",
    type: "pickup",
    status: "In Progress",
    address: "Home (Jl. Merpati No. 45)",
    date: "2025-12-12T08:00:00Z",
  },
  {
    id: "dlv-8n3w",
    orderId: "o-j8l4x",
    type: "delivery",
    status: "Completed",
    address: "Office (Jl. Sudirman Kav 5)",
    date: "2025-12-05T16:30:00Z",
  },
];

// UPDATED: Available Rewards Data (Added 'code')
const availableRewards = [
  {
    id: "v-001",
    name: "Free Delivery",
    cost: 500,
    code: "FREEDEL2025",
    expiresAt: "2026-01-15T00:00:00Z",
    icon: Truck,
  },
  {
    id: "v-002",
    name: "10% Off Dry Clean",
    cost: 350,
    code: "DRYCLEAN10",
    expiresAt: "2025-12-25T00:00:00Z",
    icon: MapPin,
  },
  {
    id: "v-003",
    name: "IDR 20k Voucher",
    cost: 800,
    code: "DISC20K",
    expiresAt: "2026-02-01T00:00:00Z",
    icon: Ticket,
  },
];

export default function CustomerDashboard() {
  return (
    <div className="p-4 md:p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* HERO SECTION: Welcome & Points */}
        <Card
          className="border-none bg-primary text-primary-foreground"
          style={cardShadowStyle}
        >
          <CardContent>
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <CardTitle className="font-bold text-2xl">
                  Hello, {userProfile.name}
                </CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  {userProfile.phone}
                </CardDescription>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-primary-foreground/10 px-4 py-2 backdrop-blur-sm">
                <div className="rounded-full bg-yellow-400 p-2 text-yellow-900">
                  <Wallet className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-xs opacity-80">
                    Current Points
                  </p>
                  <p className="font-bold text-xl">{userProfile.points}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* LEFT COLUMN (2/3): Deliveries & Orders */}
          <div className="space-y-6 lg:col-span-2">
            {/* Recent Deliveries */}
            <Card className="gap-3" style={cardShadowStyle}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-3">
                  <CardTitle className="font-semibold md:text-lg">
                    Recent Deliveries
                  </CardTitle>
                  <Link
                    className={cn(buttonVariants({ variant: "outline" }))}
                    href="/customer-deliveries"
                  >
                    View All
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4">
                {recentDeliveries.map((delivery) => (
                  <DeliveriesItem delivery={delivery} key={delivery.id} />
                ))}
              </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card style={cardShadowStyle}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-semibold text-lg">
                    Recent Orders
                  </CardTitle>
                  <Link
                    className={cn(buttonVariants({ variant: "outline" }))}
                    href="/customer-orders"
                  >
                    View All
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4">
                {recentOrders.map((order) => (
                  <OrderListItem key={order.id} order={order} />
                ))}
              </CardContent>
            </Card>
          </div>

          {/* RIGHT COLUMN (1/3): Quick Actions & Rewards */}
          <div className="row-start-1 space-y-6 lg:row-auto">
            {/* Quick Actions */}
            <Card className="gap-3" style={cardShadowStyle}>
              <CardHeader>
                <CardTitle className="font-semibold text-base">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "flex h-24 flex-col items-center justify-center gap-2 border-2 text-primary transition-all hover:border-primary/30 hover:bg-primary/10"
                    )}
                    href="/customer-orders/new"
                  >
                    <Truck className="h-6 w-6" />
                    <span className="font-semibold text-xs">New Order</span>
                  </Link>
                  <Link
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "flex h-24 flex-col items-center justify-center gap-2 border-2 text-primary transition-all hover:border-primary/30 hover:bg-primary/10"
                    )}
                    href="/account#address"
                  >
                    <MapPin className="h-6 w-6" />
                    <span className="font-semibold text-xs">
                      Manage Address
                    </span>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* UPDATED: My Rewards (With Codes) */}
            <Card className="gap-0" style={cardShadowStyle}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="font-semibold text-base">
                    Available Rewards
                  </CardTitle>
                </div>
                <CardDescription>Redeem your points for deals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {availableRewards.map((reward) => (
                    <div
                      className="relative flex flex-col gap-2 rounded-lg border border-dashed p-3"
                      key={reward.id}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="font-medium text-sm">{reward.name}</p>
                            <Client>
                              <p className="text-muted-foreground text-xs">
                                Expires {formatDate(reward.expiresAt)}
                              </p>
                            </Client>
                          </div>
                        </div>
                      </div>
                      <div className="mt-1 flex items-center justify-between border-t border-dashed pt-2">
                        <span className="font-bold text-primary text-xs">
                          {reward.cost} pts
                        </span>
                        {/* Changed Button to Code Display */}
                        <div className="flex items-center justify-center rounded bg-muted px-2 py-1">
                          <span className="font-bold font-mono text-[10px] tracking-wide">
                            {reward.code}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
