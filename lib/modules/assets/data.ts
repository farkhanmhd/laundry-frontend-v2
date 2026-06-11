import { elysia } from "@/elysia";
import { BaseApi } from "@/lib/modules/base-api";

export type Asset = {
  id: string;
  name: string;
  licensePlate: string;
};

export abstract class AssetsApi extends BaseApi {
  static async getAssets(query?: { search?: string; page?: number; rows?: number }) {
    const { data: response } = await elysia.assets.get({
      ...(await AssetsApi.getConfig()),
      query,
    });

    return response?.data as { assets: Asset[]; total: number } | undefined;
  }

  static async createAsset(body: { name: string; licensePlate: string }) {
    const result = await elysia.assets.post(body, {
      ...(await AssetsApi.getConfig()),
    });

    return result;
  }

  static async updateAsset(id: string, body: { name?: string; licensePlate?: string }) {
    const result = await elysia.assets({ id }).patch(body, {
      ...(await AssetsApi.getConfig()),
    });

    return result;
  }

  static async deleteAsset(id: string) {
    const result = await elysia.assets({ id }).delete(
      {},
      { ...(await AssetsApi.getConfig()) }
    );

    return result;
  }
}
