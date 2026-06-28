import { elysia } from "@/elysia";
import type { Driver } from "./data";

export const getDrivers = async (query: { search?: string; rows?: number }) => {
  const { data: response } = await elysia.drivers.get({
    fetch: {
      credentials: "include",
    },
    query,
  });

  return response?.data as { drivers: Driver[]; total: number } | undefined;
};
