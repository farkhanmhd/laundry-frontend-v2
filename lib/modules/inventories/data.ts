import { elysia } from "@/elysia";
import { BaseApi } from "@/lib/modules/base-api";

export type UpdateInventoryBody = Parameters<
  ReturnType<typeof elysia.inventories>["patch"]
>[0];

export type UpdateInventoryImageBody = Parameters<
  ReturnType<typeof elysia.inventories>["image"]["patch"]
>[0];

export type AdjustQuantityBody = Parameters<
  ReturnType<typeof elysia.inventories>["stock"]["patch"]
>[0];

type AddInventoryBody = Parameters<typeof elysia.inventories.post>[0];

export type Inventory = NonNullable<
  Awaited<ReturnType<typeof InventoriesApi.getInventoryById>>
>;
export type InventoryHistory = NonNullable<
  Awaited<ReturnType<typeof InventoriesApi.getInventoryHistory>>
>["inventoryHistory"][number];

export type InventoryHistoryQuery = NonNullable<
  Parameters<typeof elysia.inventories.history.get>[0]
>["query"];

export abstract class InventoriesApi extends BaseApi {
  static async getInventories() {
    const { data: response } = await elysia.inventories.get({
      ...(await InventoriesApi.getConfig()),
    });

    const data = response?.data;
    return data;
  }

  static async getInventoryHistory(query: InventoryHistoryQuery) {
    const { data: response } = await elysia.inventories.history.get({
      ...(await InventoriesApi.getConfig()),
      query,
    });

    const data = response?.data;
    return data;
  }

  static async getInventoryById(id: string) {
    const { data: response } = await elysia.inventories({ id }).get({
      ...(await InventoriesApi.getConfig()),
    });

    const data = response?.data;
    return data;
  }

  static async getInventoryOptions() {
    const { data: response } = await elysia.inventories.options.get({
      ...(await InventoriesApi.getConfig()),
    });

    const data = response?.data;

    if (!data) {
      return [];
    }

    return data;
  }

  static async addInventory(body: AddInventoryBody) {
    const result = await elysia.inventories.post(body, {
      ...(await InventoriesApi.getFormDataConfig()),
    });

    return result;
  }

  static async deleteInventory(id: string) {
    const result = await elysia.inventories({ id }).delete(
      {},
      {
        ...(await InventoriesApi.getConfig()),
      }
    );

    return result;
  }

  static async updateInventoryImage(
    id: string,
    body: UpdateInventoryImageBody
  ) {
    const result = await elysia.inventories({ id }).image.patch(body, {
      ...(await InventoriesApi.getFormDataConfig()),
    });

    return result;
  }

  static async updateInventoryData(id: string, body: UpdateInventoryBody) {
    const result = await elysia.inventories({ id }).patch(body, {
      ...(await InventoriesApi.getConfig()),
    });

    return result;
  }

  static async adjustQuantity(id: string, body: AdjustQuantityBody) {
    const result = await elysia.inventories({ id }).stock.patch(body, {
      ...(await InventoriesApi.getConfig()),
    });

    return result;
  }
}
