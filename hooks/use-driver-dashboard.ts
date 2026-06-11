"use client";

import { useQuery } from "@tanstack/react-query";
import { DriverDashboardApi } from "@/lib/modules/driver-dashboard/data";

export const driverDashboardKeys = {
  all: ["driver-dashboard"] as const,
  metrics: () => [...driverDashboardKeys.all, "metrics"] as const,
  activeRoute: () => [...driverDashboardKeys.all, "active-route"] as const,
  recentDeliveries: () =>
    [...driverDashboardKeys.all, "recent-deliveries"] as const,
  deliveryStatus: () =>
    [...driverDashboardKeys.all, "delivery-status"] as const,
};

export function useDriverMetrics() {
  return useQuery({
    queryKey: driverDashboardKeys.metrics(),
    queryFn: () => DriverDashboardApi.getMetrics(),
  });
}

export function useActiveRoute() {
  return useQuery({
    queryKey: driverDashboardKeys.activeRoute(),
    queryFn: () => DriverDashboardApi.getActiveRoute(),
  });
}

export function useRecentDeliveries() {
  return useQuery({
    queryKey: driverDashboardKeys.recentDeliveries(),
    queryFn: () => DriverDashboardApi.getRecentDeliveries(),
  });
}

export function useDeliveryStatus() {
  return useQuery({
    queryKey: driverDashboardKeys.deliveryStatus(),
    queryFn: () => DriverDashboardApi.getDeliveryStatus(),
  });
}
