import { elysiaClient } from "@/elysia/client";

export type BusinessSettings = {
  id: string;
  address: string;
  latitude: string;
  longitude: string;
  maxDistanceKm: string;
  createdAt: string;
  updatedAt: string;
};

export type BusinessSettingsInput = {
  address: string;
  latitude: string;
  longitude: string;
  maxDistanceKm: string;
};

const BASE_CONFIG = {
  fetch: {
    credentials: "include" as const,
  },
};

export abstract class BusinessSettingsApi {
  static async get() {
    const { data: response } =
      await elysiaClient["business-settings"].get(BASE_CONFIG);
    return response;
  }

  static async upsert(body: BusinessSettingsInput) {
    const result = await elysiaClient["business-settings"].put(body, {
      ...BASE_CONFIG,
    });
    return result;
  }

  static async patch(body: Partial<BusinessSettingsInput>) {
    const result = await elysiaClient["business-settings"].patch(body, {
      ...BASE_CONFIG,
    });
    return result;
  }
}
