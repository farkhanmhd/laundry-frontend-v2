"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  recentOrders: React.ReactNode;
  operationalMetrics: React.ReactNode;
  pickupRequests: React.ReactNode;
  deliveryRequests: React.ReactNode;
  children: React.ReactNode;
};

export default function EmployeeDashboard({
  recentOrders,
  operationalMetrics,
  pickupRequests,
  deliveryRequests,
  children,
}: Props) {
  const t = useTranslations("Dashboard.admin");
  return (
    <div className="min-h-screen p-6">
      <div className="flex flex-col gap-6">
        {/* Header Section */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="font-bold text-3xl text-foreground tracking-tight">
              {t("title")}
            </h1>
          </div>
          <div className="flex gap-3">
            <Link className={cn(buttonVariants())} href="/pos">
              <Plus className="h-4 w-4" />
              {t("newOrder")}
            </Link>
          </div>
        </div>

        {/* Quick Action Stats Slot */}
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {operationalMetrics}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {pickupRequests}
          {deliveryRequests}
        </div>
        {recentOrders}
        {children}
      </div>
    </div>
  );
}
