import { headers } from "next/headers";
import { elysia } from "@/elysia";
import { getHeadersWithoutContentType } from "@/lib/auth/auth-helpers";
import type { AddInventorySchema } from "./schema";

export const getInventories = async () => {
  const { data: response } = await elysia.inventories.get({
    fetch: {
      headers: await headers(),
    },
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

export type Inventory = NonNullable<
  Awaited<ReturnType<typeof getInventoryById>>
>;

export const addInventory = async (body: AddInventorySchema) => {
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
