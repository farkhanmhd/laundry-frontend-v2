import { elysia } from "@/elysia";
import { BaseApi } from "@/lib/modules/base-api";
import type { SearchQuery } from "@/lib/search-params";

export type PickupsQuery = SearchQuery & {
  status?: "cancelled" | "completed" | "requested" | "in_progress" | "assigned";
};

export type DeliveriesQuery = SearchQuery & {
  status?: "cancelled" | "completed" | "requested" | "in_progress" | "assigned";
};

export abstract class PickupsApi extends BaseApi {
  static async getPickups(query: PickupsQuery) {
    const { data: response } = await elysia.deliveries.pickups.get({
      ...(await PickupsApi.getConfig()),
      query,
    });

    const data = response?.data;
    return data;
  }
}

export abstract class DeliveriesApi extends BaseApi {
  static async getDeliveries(query: DeliveriesQuery) {
    const { data: response } = await elysia.deliveries.deliveries.get({
      ...(await DeliveriesApi.getConfig()),
      query,
    });

    const data = response?.data;
    return data;
  }
}

export type Pickup = {
  id: string;
  orderId: string;
  routeId: string | null;
  customerName: string;
  customerPhone: string;
  address: string;
  status: "requested" | "assigned" | "in_progress" | "completed" | "cancelled";
  requestedAt: string;
};

export type Delivery = {
  id: string;
  orderId: string;
  routeId: string | null;
  customerName: string;
  customerPhone: string;
  address: string;
  status: "requested" | "assigned" | "in_progress" | "completed" | "cancelled";
  requestedAt: string;
};
