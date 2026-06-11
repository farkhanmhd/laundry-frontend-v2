"use client";

import { useTranslations } from "next-intl";
import { DriverActiveRoute } from "./driver-active-route";
import { DriverMetrics } from "./driver-metrics";
import { DriverRecentDeliveries } from "./driver-recent-deliveries";
import { DriverStatusChart } from "./driver-status-chart";

export function DriverDashboard() {
  const t = useTranslations("driverDashboard");
  return (
    <div className="min-h-[calc(100dvh-128px)] p-6 md:min-h-[calc(100dvh-64px)]">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="font-bold text-3xl text-foreground tracking-tight">
            {t("title")}
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          <DriverMetrics />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <DriverActiveRoute />
          <DriverStatusChart />
        </div>

        <DriverRecentDeliveries />
      </div>
    </div>
  );
}
