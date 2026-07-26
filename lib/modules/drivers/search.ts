import { elysiaClient } from "@/elysia/client";
import type { Driver } from "./data";

export const getDrivers = async (query: { search?: string; rows?: number }) => {
  const { data: response } = await elysiaClient.drivers.get({
    fetch: {
      credentials: "include",
    },
    query,
  });

  return response?.data as { drivers: Driver[]; total: number } | undefined;
};
