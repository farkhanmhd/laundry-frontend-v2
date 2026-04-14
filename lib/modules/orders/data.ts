import type { Prettify } from "better-auth";
import { elysia } from "@/elysia";
import type { SearchQuery } from "@/lib/search-params";

export abstract class OrdersApi {
  static async getOrders(query: SearchQuery) {
    const { data: response } = await elysia.orders.get({
      fetch: {
        credentials: "include",
      },
      query,
    });

    const data = response?.data;
    return data;
  }

  static async getOrderStatus(id: string) {
    const { data: response } = await elysia.orders({ id }).status.get({
      fetch: {
        credentials: "include",
      },
    });

    const data = response?.data;
    return data;
  }

  static async getOrderItems(id: string) {
    const { data: response } = await elysia.orders({ id }).items.get({
      fetch: {
        credentials: "include",
      },
    });

    const data = response?.data;
    return data;
  }

  static async getOrderPayment(id: string) {
    const { data: response } = await elysia.orders({ id }).payment.get({
      fetch: {
        credentials: "include",
      },
    });

    const data = response?.data;
    return data;
  }

  static async getOrderCustomer(id: string) {
    const { data: response } = await elysia.orders({ id }).customer.get({
      fetch: {
        credentials: "include",
      },
    });

    const data = response?.data;
    return data;
  }

  static async getOrderDeliveries(id: string) {
    const { data: response } = await elysia.orders({ id }).deliveries.get({
      fetch: {
        credentials: "include",
      },
    });

    const data = response?.data;
    return data;
  }

  static async getOrderPaymentDetails(id: string) {
    const { data: response } = await elysia.orders({ id }).payment_details.get({
      fetch: {
        credentials: "include",
      },
    });

    const data = response?.data;
    return data;
  }
}

export type OrderStatusResponse = NonNullable<
  Awaited<ReturnType<typeof OrdersApi.getOrderStatus>>
>;

export type OrderPaymentResponse = NonNullable<
  Awaited<ReturnType<typeof OrdersApi.getOrderPayment>>
>;

export type OrderCustomerResponse = NonNullable<
  Awaited<ReturnType<typeof OrdersApi.getOrderCustomer>>
>;

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

export type OrderPaymentDetails = NonNullable<
  Awaited<ReturnType<typeof OrdersApi.getOrderPaymentDetails>>
>;

export type OrderDelivery = Prettify<
  NonNullable<Awaited<ReturnType<typeof OrdersApi.getOrderDeliveries>>>[number]
>;
