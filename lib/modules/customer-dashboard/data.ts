import { elysia } from "@/elysia";

export abstract class CustomerDashboardApi {
  static async getCustomerInfo() {
    const { data: response } = await elysia["customer-dashboard"].customer.get({
      fetch: {
        credentials: "include",
      },
    });

    if (!response) {
      throw new Error("Failed to fetch customer info");
    }

    return response.data;
  }

  static async getOrders() {
    const { data: response } = await elysia["customer-dashboard"].orders.get({
      fetch: {
        credentials: "include",
      },
    });

    if (!response) {
      throw new Error("Failed to fetch dashboard orders");
    }

    return response.data;
  }

  static async getDeliveries() {
    const { data: response } = await elysia[
      "customer-dashboard"
    ].deliveries.get({
      fetch: {
        credentials: "include",
      },
    });

    if (!response) {
      throw new Error("Failed to fetch dashboard deliveries");
    }

    return response.data;
  }

  static async getVouchers() {
    const { data: response } = await elysia["customer-dashboard"].vouchers.get({
      fetch: {
        credentials: "include",
      },
    });

    if (!response) {
      throw new Error("Failed to fetch dashboard vouchers");
    }

    return response.data;
  }
}

export type CustomerInfo = NonNullable<
  Awaited<ReturnType<typeof CustomerDashboardApi.getCustomerInfo>>
>;

export type DashboardOrder = NonNullable<
  Awaited<ReturnType<typeof CustomerDashboardApi.getOrders>>
>[number];

export type DashboardDelivery = NonNullable<
  Awaited<ReturnType<typeof CustomerDashboardApi.getDeliveries>>
>[number];

export type DashboardVoucher = NonNullable<
  Awaited<ReturnType<typeof CustomerDashboardApi.getVouchers>>
>[number];
