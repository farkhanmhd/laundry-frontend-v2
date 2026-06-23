import { elysia } from "@/elysia";
import { BaseApi } from "@/lib/modules/base-api";

export type WeightRange = {
  id: number;
  label: string;
  minWeight: string;
  maxWeight: string;
  isActive: boolean | null;
  createdAt: string;
};

export abstract class WeightRangesApi extends BaseApi {
  static async getAll() {
    const { data: response } = await elysia["weight-ranges"].get({
      ...(await WeightRangesApi.getConfig()),
    });
    return response?.data as WeightRange[];
  }

  static async getById(id: number) {
    const data = await WeightRangesApi.getAll();
    return data?.find((wr) => wr.id === id) ?? null;
  }

  static async create(body: {
    label: string;
    minWeight: number;
    maxWeight: number;
  }) {
    const result = await elysia["weight-ranges"].post(body, {
      ...(await WeightRangesApi.getConfig()),
    });
    return result;
  }

  static async update(
    id: number,
    body: {
      label?: string;
      minWeight?: number;
      maxWeight?: number;
      isActive?: boolean;
    }
  ) {
    const result = await elysia["weight-ranges"]({ id: String(id) }).patch(
      body,
      {
        ...(await WeightRangesApi.getConfig()),
      }
    );
    return result;
  }
}
