import { elysia } from "@/elysia";

export abstract class AdminDashboardApi {
  static async getMetrics(from?: string, to?: string) {
    const { data: response } = await elysia["admin-dashboard"].metrics.get({
      fetch: {
        credentials: "include",
      },
      query: { from, to },
    });

    if (!response) {
      throw new Error("Failed to fetch dashboard metrics");
    }
    return response.data;
  }

  static async getOrders() {
    const { data: response } = await elysia["admin-dashboard"].orders.get({
      fetch: {
        credentials: "include",
      },
    });

    if (!response) {
      throw new Error("Failed to fetch dashboard orders");
    }
    return response.data;
  }

  static async getLowStock() {
    const { data: response } = await elysia["admin-dashboard"]["low-stock"].get(
      {
        fetch: {
          credentials: "include",
        },
      }
    );

    if (!response) {
      throw new Error("Failed to fetch low stock items");
    }
    return response.data;
  }

  static async getOrderStatus(query: { from: string; to: string }) {
    const { data: response } = await elysia["admin-dashboard"][
      "order-status"
    ].get({
      fetch: {
        credentials: "include",
      },
      query,
    });

    if (!response) {
      throw new Error("Failed to fetch order status");
    }
    return response.data;
  }

  static async getTopServices(query: { from: string; to: string }) {
    const { data: response } = await elysia["admin-dashboard"][
      "top-services"
    ].get({
      fetch: {
        credentials: "include",
      },
      query,
    });

    if (!response) {
      throw new Error("Failed to fetch top services");
    }
    return response.data;
  }

  static async getInventoryUsage(query: { from: string; to: string }) {
    const { data: response } = await elysia["admin-dashboard"][
      "inventory-usage"
    ].get({
      fetch: {
        credentials: "include",
      },
      query,
    });

    if (!response) {
      throw new Error("Failed to fetch inventory usage");
    }
    return response.data;
  }

  static async getBundlingStats(query: { from: string; to: string }) {
    const { data: response } = await elysia["admin-dashboard"][
      "bundling-stats"
    ].get({
      fetch: {
        credentials: "include",
      },
      query,
    });

    if (!response) {
      throw new Error("Failed to fetch bundling stats");
    }
    return response.data;
  }

  static async getOperationalMetrics() {
    const { data: response } = await elysia["admin-dashboard"][
      "operational-metrics"
    ].get({
      fetch: {
        credentials: "include",
      },
    });
    if (!response) {
      throw new Error("Failed to fetch operational metrics");
    }
    return response.data;
  }

  static async getRecentPickups() {
    const { data: response } = await elysia["admin-dashboard"][
      "recent-pickups"
    ].get({
      fetch: {
        credentials: "include",
      },
    });
    if (!response) {
      throw new Error("Failed to fetch recent pickups");
    }
    return response.data;
  }

  static async getRecentDeliveries() {
    const { data: response } = await elysia["admin-dashboard"][
      "recent-deliveries"
    ].get({
      fetch: {
        credentials: "include",
      },
    });
    if (!response) {
      throw new Error("Failed to fetch recent deliveries");
    }
    return response.data;
  }
}

export type DashboardOrder = NonNullable<
  Awaited<ReturnType<typeof AdminDashboardApi.getOrders>>
>[number];

export type LowStockItem = NonNullable<
  Awaited<ReturnType<typeof AdminDashboardApi.getLowStock>>
>[number];

export type DashboardMetrics = NonNullable<
  Awaited<ReturnType<typeof AdminDashboardApi.getMetrics>>
>;

export type OrderStatusData = NonNullable<
  Awaited<ReturnType<typeof AdminDashboardApi.getOrderStatus>>
>[number];

export type TopServiceItem = NonNullable<
  Awaited<ReturnType<typeof AdminDashboardApi.getTopServices>>
>[number];

export type InventoryUsageItem = NonNullable<
  Awaited<ReturnType<typeof AdminDashboardApi.getInventoryUsage>>
>[number];

export type BundlingStatsItem = NonNullable<
  Awaited<ReturnType<typeof AdminDashboardApi.getBundlingStats>>
>[number];

export type OperationalMetrics = NonNullable<
  Awaited<ReturnType<typeof AdminDashboardApi.getOperationalMetrics>>
>;

export type RecentPickup = NonNullable<
  Awaited<ReturnType<typeof AdminDashboardApi.getRecentPickups>>
>[number];

export type RecentDelivery = NonNullable<
  Awaited<ReturnType<typeof AdminDashboardApi.getRecentDeliveries>>
>[number];
