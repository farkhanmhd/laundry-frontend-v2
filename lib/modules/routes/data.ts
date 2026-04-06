import { elysia } from "@/elysia";
import { BaseApi } from "../base-api";

export type Delivery = NonNullable<
  Awaited<ReturnType<typeof RoutesApi.getRouteDetail>>["deliveries"]
>[number];

export abstract class RoutesApi extends BaseApi {
  static async getRouteDetail(id: string) {
    const { data: response, error } = await elysia.routes({ id }).get({
      ...(await RoutesApi.getConfig()),
    });

    if (error) {
      throw new Error("Failed to fetch route detail");
    }

    return response?.data;
  }
}
