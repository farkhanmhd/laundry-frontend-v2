import type { Prettify } from "better-auth";
import { elysia } from "@/elysia";
import type { SearchQuery } from "@/lib/search-params";

export const deliveryStatus = [
  "requested" as const,
  "picked_up" as const,
  "in_progress" as const,
  "completed" as const,
  "cancelled" as const,
];

export type DeliveryStatus = (typeof deliveryStatus)[number];

export type PickupsQuery = SearchQuery & {
  status?: DeliveryStatus[] | undefined;
};

export type DeliveriesQuery = SearchQuery & {
  status?: DeliveryStatus[] | undefined;
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
    console.log({ query });
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
