import { elysia } from "@/elysia";
import { BaseApi } from "@/lib/modules/base-api";

export type Vehicle = {
  id: string;
  name: string;
  licensePlate: string;
  ownerName: string | null;
  ownerId: string | null;
};

export abstract class VehiclesApi extends BaseApi {
  static async getVehicles(query?: {
    search?: string;
    page?: number;
    rows?: number;
  }) {
    const { data: response } = await elysia.vehicles.get({
      ...(await VehiclesApi.getConfig()),
      query,
    });

    return response?.data as { vehicles: Vehicle[]; total: number } | undefined;
  }

  static async getVehicle(id: string) {
    const { data: response } = await elysia.vehicles({ id }).get({
      ...(await VehiclesApi.getConfig()),
    });

    return response?.data as Vehicle | undefined;
  }

  static async createVehicle(body: { name: string; licensePlate: string }) {
    const result = await elysia.vehicles.post(body, {
      ...(await VehiclesApi.getConfig()),
    });

    return result;
  }

  static async updateVehicle(
    id: string,
    body: { name?: string; licensePlate?: string }
  ) {
    const result = await elysia.vehicles({ id }).patch(body, {
      ...(await VehiclesApi.getConfig()),
    });

    return result;
  }

  static async deleteVehicle(id: string) {
    const result = await elysia
      .vehicles({ id })
      .delete({}, { ...(await VehiclesApi.getConfig()) });

    return result;
  }
}
