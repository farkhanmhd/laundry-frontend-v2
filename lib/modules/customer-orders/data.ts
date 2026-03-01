import { elysia } from "@/elysia";
import { BaseApi } from "../base-api";

export abstract class CustomerOrdersApi extends BaseApi {
  static async getCustomerOrderDetail(id: string) {
    const { data: response } = await elysia
      .customerorders({
        id,
      })
      .detail.get({
        ...(await CustomerOrdersApi.getConfig()),
      });

    if (!response) {
      throw new Error("Failed to fetch customer order detail");
    }

    return response.data;
  }

  static async getCustomerOrderItems(id: string) {
    const { data: response } = await elysia
      .customerorders({
        id,
      })
      .items.get({
        ...(await CustomerOrdersApi.getConfig()),
      });

    if (!response) {
      throw new Error("Failed to fetch customer order items");
    }

    return response.data;
  }

  static async getCustomerOrderPayment(id: string) {
    const { data: response } = await elysia
      .customerorders({
        id,
      })
      .payment.get({
        ...(await CustomerOrdersApi.getConfig()),
      });

    if (!response) {
      throw new Error("Failed to fetch customer order payment");
    }

    return response.data;
  }

  static async getCustomerOrderDelivery(id: string) {
    const { data: response } = await elysia
      .customerorders({
        id,
      })
      .delivery.get({
        ...(await CustomerOrdersApi.getConfig()),
      });

    if (!response) {
      throw new Error("Failed to fetch customer order delivery");
    }

    return response.data;
  }
}
