import type { Prettify } from "better-auth";
import { elysiaClient } from "@/elysia/client";
import type { RequestPickupSchema } from "./schema";

const customerOrderFetchConfig = {
  fetch: {
    credentials: "include" as const,
  },
};

export abstract class CustomerOrdersApi {
  static async getCustomerOrderDetail(id: string) {
    const { data: response } = await elysiaClient
      .customerorders({
        id,
      })
      .detail.get(customerOrderFetchConfig);

    if (!response) {
      throw new Error("Failed to fetch customer order detail");
    }

    return response.data;
  }

  static async getCustomerOrderItems(id: string) {
    const { data: response } = await elysiaClient
      .customerorders({
        id,
      })
      .items.get(customerOrderFetchConfig);

    if (!response) {
      throw new Error("Failed to fetch customer order items");
    }

    return response.data;
  }

  static async getCustomerOrderPayment(id: string) {
    const { data: response } = await elysiaClient
      .customerorders({
        id,
      })
      .payment.get(customerOrderFetchConfig);

    if (!response) {
      throw new Error("Failed to fetch customer order payment");
    }

    return response.data;
  }

  static async getCustomerOrderDelivery(id: string) {
    const { data: response } = await elysiaClient
      .customerorders({
        id,
      })
      .delivery.get(customerOrderFetchConfig);

    if (!response) {
      throw new Error("Failed to fetch customer order delivery");
    }

    return response.data;
  }

  static async createPickupRequest(body: RequestPickupSchema) {
    const response = await elysiaClient.customerorders["request-pickup"].post(
      body,
      customerOrderFetchConfig
    );

    return response;
  }

  static async getOrderPaymentDetails(id: string) {
    const { data: response } = await elysiaClient
      .customerorders({ id })
      .payment_details.get(customerOrderFetchConfig);

    const data = response?.data;

    return data;
  }

  static async cancelCustomerOrder(id: string) {
    const result = await elysiaClient
      .customerorders({ id })
      .patch({}, customerOrderFetchConfig);

    return result;
  }
}

export type CustomerOrderItem = Prettify<
  NonNullable<
    Awaited<ReturnType<typeof CustomerOrdersApi.getCustomerOrderItems>>
  >[number]
>;
