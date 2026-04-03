"use client";

import type React from "react";

// Top Services Data
// --- RECENT ORDERS DATA ---
interface Props {
  recentOrders: React.ReactNode;
  lowStocks: React.ReactNode;
  date: React.ReactNode;
  keyMetrics: React.ReactNode;
  orderStatus: React.ReactNode;
  performances: React.ReactNode;
}

export default function SuperAdminDashboard({
  recentOrders,
  lowStocks,
  date,
  keyMetrics,
  orderStatus,
  performances,
}: Props) {
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

        {keyMetrics}

        {/* ROW 1: Order Status, Delivery Status, Low Stock */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Order Status Distribution (Donut Chart) */}
          {orderStatus}

          {/* Low Stock Alert - Clickable Links */}
          {lowStocks}
        </div>

        {/* ROW 2: Top Services, Inventory Usage, Bundling */}
        {performances}
        {/* ROW 4: Recent Orders */}
        {recentOrders}
      </div>
    </div>
  );
}
