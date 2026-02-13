import { elysia } from "@/elysia";
import { BaseApi } from "@/lib/modules/base-api";
import type { UpdateBundlingBodySchema } from "./schema";

export type Bundling = NonNullable<
  Awaited<ReturnType<typeof BundlingsApi.getBundlingById>>
>;

type AddBundlingBody = Parameters<typeof elysia.bundlings.post>[0];

type UpdateBundlingItemBody = Parameters<
  ReturnType<typeof elysia.bundlings>["items"]["patch"]
>[0];

export type UpdateBundlingImageBody = Parameters<
  ReturnType<typeof elysia.bundlings>["image"]["patch"]
>[0];

export abstract class BundlingsApi extends BaseApi {
  static async getBundlings() {
    const { data: response } = await elysia.bundlings.get({
      ...(await BundlingsApi.getConfig()),
    });

    const data = response?.data;
    return data;
  }

  static async getBundlingById(id: string) {
    const { data: response } = await elysia.bundlings({ id }).get({
      ...(await BundlingsApi.getConfig()),
    });

    const data = response?.data;
    return data;
  }

  static async addBundling(body: AddBundlingBody) {
    const formData = new FormData();

    formData.append("name", body.name);
    formData.append("price", String(body.price));
    formData.append("description", body.description);
    formData.append("image", body.image);
    formData.append("items", JSON.stringify(body.items));

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/bundlings`,
      {
        method: "POST",
        ...(await BundlingsApi.getFormDataConfig()),
        body: formData,
      }
    );

    const json = await response.json();
    return json;
  }

  // static async deleteBundling(id: string) {
  //   const result = await elysia.bundlings({ id }).delete(
  //     {},
  //     {
  //       ...(await BundlingsApi.getConfig()),
  //     }
  //   );

  //   return result;
  // }

  static async updateBundlingData(id: string, body: UpdateBundlingBodySchema) {
    const result = await elysia.bundlings({ id }).patch(body, {
      ...(await BundlingsApi.getConfig()),
    });

    return result;
  }

  static async updateBundlingItems(id: string, body: UpdateBundlingItemBody) {
    const result = await elysia.bundlings({ id }).items.patch(body, {
      ...(await BundlingsApi.getFormDataConfig()),
    });

    return result;
  }

  static async updateBundlingImage(id: string, body: UpdateBundlingImageBody) {
    const result = await elysia.bundlings({ id }).image.patch(body, {
      ...(await BundlingsApi.getFormDataConfig()),
    });

    return result;
  }
}
