import { elysia } from "@/elysia";
import { BaseApi } from "@/lib/modules/base-api";
import type { AddServiceBody } from "./actions";

export type UpdateServiceData = Parameters<
  ReturnType<typeof elysia.services>["patch"]
>[0];

export type UpdateServiceImage = Parameters<
  ReturnType<typeof elysia.services>["image"]["patch"]
>[0];

export abstract class ServicesApi extends BaseApi {
  static async getServices() {
    const { data: response } = await elysia.services.get({
      ...(await ServicesApi.getConfig()),
    });

    const data = response?.data;
    return data;
  }

  static async getServiceById(id: string) {
    const { data: response } = await elysia.services({ id }).get({
      ...(await ServicesApi.getConfig()),
    });

    const data = response?.data;
    return data;
  }

  static async addService(body: AddServiceBody) {
    const result = await elysia.services.post(body, {
      ...(await ServicesApi.getFormDataConfig()),
    });

    return result;
  }

  static async deleteService(id: string) {
    const result = await elysia.services({ id }).delete(
      {},
      {
        ...(await ServicesApi.getConfig()),
      }
    );

    return result;
  }

  static async updateServiceImage(id: string, body: UpdateServiceImage) {
    const result = await elysia.services({ id }).image.patch(body, {
      ...(await ServicesApi.getFormDataConfig()),
    });

    return result;
  }

  static async updateServiceData(id: string, body: UpdateServiceData) {
    const result = await elysia.services({ id }).patch(body, {
      ...(await ServicesApi.getConfig()),
    });

    return result;
  }
}

export type ServicesArray = Awaited<ReturnType<typeof ServicesApi.getServices>>;
export type Service = NonNullable<ServicesArray>[number];
