import { headers } from "next/headers";
import { elysia } from "@/elysia";
import { getHeadersWithoutContentType } from "@/lib/auth/auth-helpers";
import type { UpdateBundlingBodySchema } from "./schema";

export const getBundlings = async () => {
  const { data: response } = await elysia.bundlings.get({
    fetch: {
      headers: await headers(),
    },
  });

  const data = response?.data;

  return data;
};

export const getBundlingById = async (id: string) => {
  const { data: response } = await elysia.bundlings({ id }).get({
    fetch: {
      headers: await headers(),
    },
  });

  const data = response?.data;

  return data;
};

export type Bundling = NonNullable<Awaited<ReturnType<typeof getBundlingById>>>;

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

export const updateBundlingData = async (
  id: string,
  body: UpdateBundlingBodySchema
) => {
  const result = await elysia.bundlings({ id }).patch(body, {
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
