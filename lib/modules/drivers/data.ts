import { elysia } from "@/elysia";
import { BaseApi } from "@/lib/modules/base-api";

export type Driver = {
  id: string;
  name: string;
};

export abstract class DriversApi extends BaseApi {
  static async getDrivers(query?: {
    search?: string;
    page?: number;
    rows?: number;
  }) {
    const { data: response } = await elysia.drivers.get({
      ...(await DriversApi.getConfig()),
      query,
    });

    return response?.data as { drivers: Driver[]; total: number } | undefined;
  }
}
