import { elysia } from "@/elysia";
import { BaseApi } from "../base-api";

export abstract class CustomerDeliveriesApi extends BaseApi {
  static async getDeliveries() {
    const { data: response } = await elysia["customer-deliveries"].get({
      ...(await CustomerDeliveriesApi.getConfig()),
    });

    if (!response) {
      throw new Error("Failed to fetch customer deliveries");
    }

    return response.data;
  }

  static async getDeliveryById(id: string) {
    const { data: response } = await elysia["customer-deliveries"]({ id }).get({
      ...(await CustomerDeliveriesApi.getConfig()),
    });

    if (!response) {
      throw new Error("Failed to fetch delivery detail");
    }

    return response.data;
  }
}
