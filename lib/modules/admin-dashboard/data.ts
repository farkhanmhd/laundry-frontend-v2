import { elysia } from "@/elysia";
import { BaseApi } from "../base-api";

export abstract class AdminDashboardApi extends BaseApi {
  static async getOrders() {
    const { data: response } = await elysia["admin-dashboard"].orders.get({
      ...(await AdminDashboardApi.getConfig()),
    });

    if (!response) {
      throw new Error("Failed to fetch dashboard orders");
    }

    return response.data;
  }

  static async getLowStock() {
    const { data: response } = await elysia["admin-dashboard"]["low-stock"].get(
      {
        ...(await AdminDashboardApi.getConfig()),
      }
    );

    if (!response) {
      throw new Error("Failed to fetch low stock items");
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
