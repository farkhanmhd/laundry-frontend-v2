import { headers } from "next/headers";
import { elysia } from "@/elysia";

export const getOrders = async () => {
  const { data: response } = await elysia.orders.get({
    fetch: {
      headers: await headers(),
    },
  });

  const data = response?.data;
  return data;
};

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
