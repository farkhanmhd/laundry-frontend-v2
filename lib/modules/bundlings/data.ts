import { headers } from "next/headers";
import { elysia } from "@/elysia";
import { getHeadersWithoutContentType } from "@/lib/modules/auth/auth-helpers";
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
type AddBundlingBody = Parameters<typeof elysia.bundlings.post>[0];

export const addBundling = async (body: AddBundlingBody) => {
  const formData = new FormData();

  formData.append("name", body.name);
  formData.append("price", String(body.price));
  formData.append("description", body.description);
  formData.append("image", body.image);
  formData.append("items", JSON.stringify(body.items));

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bundlings`, {
    method: "POST",
    headers: await getHeadersWithoutContentType(),
    body: formData,
  });

  const json = await response.json();
  return json;
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

type UpdateBundlingItemBody = Parameters<
  ReturnType<typeof elysia.bundlings>["items"]["patch"]
>[0];

export const updateBundlingItems = async (
  id: string,
  body: UpdateBundlingItemBody
) => {
  const result = await elysia.bundlings({ id }).items.patch(body, {
    fetch: {
      headers: await getHeadersWithoutContentType(),
    },
  });

  return result;
};

export const updateBundlingImage = async (
  id: string,
  body: UpdateInventoryImageBody
) => {
  const result = await elysia.bundlings({ id }).image.patch(body, {
    fetch: {
      headers: await getHeadersWithoutContentType(),
    },
  });

  return result;
};
