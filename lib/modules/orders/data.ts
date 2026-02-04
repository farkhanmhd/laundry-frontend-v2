import { headers } from "next/headers";
import { elysia } from "@/elysia";
import type { SearchQuery } from "@/lib/search-params";

export const getOrders = async (query: SearchQuery) => {
  const { data: response } = await elysia.orders.get({
    fetch: {
      headers: await headers(),
    },
    query,
  });

  const data = response?.data;
  return data;
};

export type Order = NonNullable<
  Awaited<ReturnType<typeof getOrders>>
>["orders"][number];

export const getOrderStatus = async (id: string) => {
  const { data: response } = await elysia.orders({ id }).status.get({
    fetch: {
      headers: await headers(),
    },
  });

  const data = response?.data;
  return data;
};

export const getOrderItems = async (id: string) => {
  const { data: response } = await elysia.orders({ id }).items.get({
    fetch: {
      headers: await headers(),
    },
  });

  const data = response?.data;
  return data;
};

export type OrderDetailResponse = NonNullable<
  Awaited<ReturnType<typeof getOrderItems>>
>;
export type OrderDetailItem = NonNullable<
  Awaited<ReturnType<typeof getOrderItems>>
>["orders"][number];
export type OrderDetailVoucher = NonNullable<
  Awaited<ReturnType<typeof getOrderItems>>
>["voucher"];

export const getOrderPayment = async (id: string) => {
  const { data: response } = await elysia.orders({ id }).payment.get({
    fetch: {
      headers: await headers(),
    },
  });

  const data = response?.data;
  return data;
};

export const getOrderCustomer = async (id: string) => {
  const { data: response } = await elysia.orders({ id }).customer.get({
    fetch: {
      headers: await headers(),
    },
  });

  const data = response?.data;
  return data;
};

export const getOrderDeliveries = async (id: string) => {
  const { data: response } = await elysia.orders({ id }).deliveries.get({
    fetch: {
      headers: await headers(),
    },
  });

  const data = response?.data;
  return data;
};
