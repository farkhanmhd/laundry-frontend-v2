import { headers } from "next/headers";
import { elysia } from "@/elysia";
import { getHeadersWithoutContentType } from "@/lib/modules/auth/auth-helpers";
// import type { InventoryHistoryQuery } from "@/lib/search-params";

export const getInventories = async () => {
  const { data: response } = await elysia.inventories.get({
    fetch: {
      headers: await headers(),
    },
  });

  const data = response?.data;

  return data;
};

export type InventoryHistoryQuery = NonNullable<
  Parameters<typeof elysia.inventories.history.get>[0]
>["query"];

export const getInventoryHistory = async (query: InventoryHistoryQuery) => {
  const { data: response } = await elysia.inventories.history.get({
    fetch: {
      headers: await headers(),
    },
    query,
  });

  const data = response?.data;
  return data;
};

export const getInventoryById = async (id: string) => {
  const { data: response } = await elysia.inventories({ id }).get({
    fetch: {
      headers: await headers(),
    },
  });

  const data = response?.data;

  return data;
};

export const getInventoryOptions = async () => {
  const { data: response } = await elysia.inventories.options.get({
    fetch: {
      headers: await headers(),
    },
  });

  const data = response?.data;

  if (!data) {
    return [];
  }

  return data;
};

export type Inventory = NonNullable<
  Awaited<ReturnType<typeof getInventoryById>>
>;
export type InventoryHistory = NonNullable<
  Awaited<ReturnType<typeof getInventoryHistory>>
>["inventoryHistory"][number];

type AddInventoryBody = Parameters<typeof elysia.inventories.post>[0];

export const addInventory = async (body: AddInventoryBody) => {
  const result = await elysia.inventories.post(body, {
    fetch: {
      headers: await getHeadersWithoutContentType(),
    },
  });

  return result;
};

export const deleteInventory = async (id: string) => {
  const result = await elysia.inventories({ id }).delete(
    {},
    {
      fetch: {
        headers: await headers(),
      },
    }
  );

  return result;
};

export type UpdateInventoryBody = Parameters<
  ReturnType<typeof elysia.inventories>["patch"]
>[0];

export type UpdateInventoryImageBody = Parameters<
  ReturnType<typeof elysia.inventories>["image"]["patch"]
>[0];

export const updateInventoryImage = async (
  id: string,
  body: UpdateInventoryImageBody
) => {
  const result = await elysia.inventories({ id }).image.patch(body, {
    fetch: {
      headers: await getHeadersWithoutContentType(),
    },
  });

  return result;
};

export const updateInventoryData = async (
  id: string,
  body: UpdateInventoryBody
) => {
  const result = await elysia.inventories({ id }).patch(body, {
    fetch: {
      headers: await headers(),
    },
  });

  return result;
};

export type AdjustQuantityBody = Parameters<
  ReturnType<typeof elysia.inventories>["stock"]["patch"]
>[0];

export const adjustQuantity = async (id: string, body: AdjustQuantityBody) => {
  const result = await elysia.inventories({ id }).stock.patch(body, {
    fetch: {
      headers: await headers(),
    },
  });

  return result;
};
