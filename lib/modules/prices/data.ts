import { elysia } from "@/elysia";
import { BaseApi } from "@/lib/modules/base-api";
import type { PosItemData } from "@/lib/modules/pos/data";

export type PriceItemData = PosItemData & {
  isCustomerOrderable: boolean | null;
  maxWeight: string | null;
};

export abstract class PricesApi extends BaseApi {
  static async getPrices() {
    const { data } = (await elysia.prices.get({
      ...(await PricesApi.getConfig()),
    })) as unknown as { data: { data: PriceItemData[] } | undefined };

    const items = data?.data;
    return items;
  }
}
