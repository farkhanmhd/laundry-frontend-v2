import { elysia } from "@/elysia";

export abstract class DriverDashboardApi {
  static async getMetrics() {
    const { data: response } = await elysia["driver-dashboard"].metrics.get({
      fetch: { credentials: "include" },
    });

    if (!response) {
      throw new Error("Failed to fetch driver dashboard metrics");
    }
    return response.data;
  }

  static async getActiveRoute() {
    const { data: response } = await elysia["driver-dashboard"][
      "active-route"
    ].get({
      fetch: { credentials: "include" },
    });

    if (!response) {
      throw new Error("Failed to fetch active route");
    }
    return response.data;
  }

  static async getRecentDeliveries() {
    const { data: response } = await elysia["driver-dashboard"][
      "recent-deliveries"
    ].get({
      fetch: { credentials: "include" },
    });

    if (!response) {
      throw new Error("Failed to fetch recent deliveries");
    }
    return response.data;
  }

  static async getDeliveryStatus() {
    const { data: response } = await elysia["driver-dashboard"][
      "delivery-status"
    ].get({
      fetch: { credentials: "include" },
    });

    if (!response) {
      throw new Error("Failed to fetch delivery status");
    }
    return response.data;
  }
}

export type DriverMetrics = NonNullable<
  Awaited<ReturnType<typeof DriverDashboardApi.getMetrics>>
>;

export type ActiveRoute = NonNullable<
  Awaited<ReturnType<typeof DriverDashboardApi.getActiveRoute>>
>;

export type RecentDelivery = NonNullable<
  Awaited<ReturnType<typeof DriverDashboardApi.getRecentDeliveries>>
>[number];

export type DeliveryStatusData = NonNullable<
  Awaited<ReturnType<typeof DriverDashboardApi.getDeliveryStatus>>
>[number];
