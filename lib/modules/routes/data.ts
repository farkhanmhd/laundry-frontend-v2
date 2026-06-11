import { elysia } from "@/elysia";
import type { SearchQuery } from "@/lib/search-params";

export abstract class RoutesApi {
  static async getRoutes(query: SearchQuery) {
    const { data: response } = await elysia.routes.get({
      fetch: {
        credentials: "include",
      },
      query,
    });

    const data = response?.data;
    return data;
  }
}

export type Route = NonNullable<
  Awaited<ReturnType<typeof RoutesApi.getRoutes>>
>["routes"][number];

export type Delivery = NonNullable<
  Awaited<ReturnType<typeof getRouteDetail>>["deliveries"]
>[number];

export async function getRouteDetail(id: string) {
  const { data: response, error } = await elysia.routes({ id }).get({
    fetch: {
      credentials: "include",
    },
  });

  if (error) {
    if ("code" in error) {
      throw new Error(`Failed to fetch route detail ${error.code}`);
    }

    throw new Error("Failed to fetch route detail");
  }

  return response?.data;
}
