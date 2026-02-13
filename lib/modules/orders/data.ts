import { elysia } from "@/elysia";
import { BaseApi } from "@/lib/modules/base-api";
import type { SearchQuery } from "@/lib/search-params";

export abstract class OrdersApi extends BaseApi {
  static async getOrders(query: SearchQuery) {
    const { data: response } = await elysia.orders.get({
      ...(await OrdersApi.getConfig()),
      query,
    });

    const data = response?.data;
    return data;
  }

  static async getOrderStatus(id: string) {
    const { data: response } = await elysia.orders({ id }).status.get({
      ...(await OrdersApi.getConfig()),
    });

    const data = response?.data;
    return data;
  }

  static async getOrderItems(id: string) {
    const { data: response } = await elysia.orders({ id }).items.get({
      ...(await OrdersApi.getConfig()),
    });

    const data = response?.data;
    return data;
  }

  static async getOrderPayment(id: string) {
    const { data: response } = await elysia.orders({ id }).payment.get({
      ...(await OrdersApi.getConfig()),
    });

    const data = response?.data;
    return data;
  }

  static async getOrderCustomer(id: string) {
    const { data: response } = await elysia.orders({ id }).customer.get({
      ...(await OrdersApi.getConfig()),
    });

    const data = response?.data;
    return data;
  }

  static async getOrderDeliveries(id: string) {
    const { data: response } = await elysia.orders({ id }).deliveries.get({
      ...(await OrdersApi.getConfig()),
    });

    const data = response?.data;
    return data;
  }
}

export type Order = NonNullable<
  Awaited<ReturnType<typeof OrdersApi.getOrders>>
>["orders"][number];

export type OrderDetailResponse = NonNullable<
  Awaited<ReturnType<typeof OrdersApi.getOrderItems>>
>;
export type OrderDetailItem = NonNullable<
  Awaited<ReturnType<typeof OrdersApi.getOrderItems>>
>["items"][number];

export type OrderDetailVoucher = NonNullable<
  Awaited<ReturnType<typeof OrdersApi.getOrderItems>>
>["voucher"];
