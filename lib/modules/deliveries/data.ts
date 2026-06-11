import type { Prettify } from "better-auth";
import { elysia } from "@/elysia";
import type { SearchQuery } from "@/lib/search-params";

export type PickupsQuery = SearchQuery & {
  status?: "cancelled" | "completed" | "requested" | "in_progress" | "assigned";
};

export type DeliveriesQuery = SearchQuery & {
  status?: "cancelled" | "completed" | "requested" | "in_progress" | "assigned";
};

export abstract class PickupsApi {
  static async getPickups(query: PickupsQuery) {
    const { data: response } = await elysia.deliveries.pickups.get({
      fetch: {
        credentials: "include",
      },
      query,
    });

    const data = response?.data;
    return data;
  }
}

export abstract class DeliveriesApi {
  static async getDeliveries(query: DeliveriesQuery) {
    const { data: response } = await elysia.deliveries.deliveries.get({
      fetch: {
        credentials: "include",
      },
      query,
    });

    const data = response?.data;
    return data;
  }
}

export type Pickup = Prettify<
  NonNullable<Awaited<ReturnType<typeof PickupsApi.getPickups>>>[number]
>;

export type Delivery = Prettify<
  NonNullable<Awaited<ReturnType<typeof DeliveriesApi.getDeliveries>>>[number]
>;
