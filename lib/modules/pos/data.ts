import { elysia } from "@/elysia";
import { BaseApi } from "@/lib/modules/base-api";
import type { NewOrderSchema } from "./schema";

export abstract class PosApi extends BaseApi {
  static async getPosItems() {
    const { data } = await elysia.pos.get({
      ...(await PosApi.getConfig()),
    });

    const items = data?.data;
    return items;
  }

  static async createNewPosOrder(body: NewOrderSchema) {
    const response = await elysia.pos.new.post(body, {
      ...(await PosApi.getConfig()),
    });

    return response;
  }

  static async getPosVouchers() {
    const { data: response } = await elysia.pos.vouchers.get({
      ...(await PosApi.getConfig()),
    });
    const vouchers = response?.data;

    return vouchers;
  }
}

export type PosItemData = NonNullable<
  Awaited<ReturnType<typeof PosApi.getPosItems>>
>[0];

export type PosVoucher = NonNullable<
  Awaited<ReturnType<typeof PosApi.getPosVouchers>>
>[0];
