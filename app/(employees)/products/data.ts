import { headers } from "next/headers";
import { elysia } from "@/elysia";
import { getHeadersWithoutContentType } from "@/lib/auth-helpers";
import type { AddProductSchema } from "./schema";

export const getProducts = async () => {
  const { data: response } = await elysia.products.get({
    fetch: {
      headers: await headers(),
    },
  });

  const data = response?.data;

  return data;
};

export const getProductById = async (id: string) => {
  const { data: response } = await elysia.products({ id }).get({
    fetch: {
      headers: await headers(),
    },
  });

  const data = response?.data;

  return data;
};

export type ProductsArray = Awaited<ReturnType<typeof getProducts>>;
export type Product = NonNullable<ProductsArray>[number];

export const addProduct = async (body: AddProductSchema) => {
  const result = await elysia.products.post(body, {
    fetch: {
      headers: await getHeadersWithoutContentType(),
    },
  });

  return result;
};

export const deleteProduct = async (id: string) => {
  const result = await elysia.products({ id }).delete(
    {},
    {
      fetch: {
        headers: await headers(),
      },
    }
  );

  return result;
};

export type UpdateProductData = Parameters<
  ReturnType<typeof elysia.products>["patch"]
>[0];

export type UpdateProductImage = Parameters<
  ReturnType<typeof elysia.products>["image"]["patch"]
>[0];

export const updateProductImage = async (
  id: string,
  body: UpdateProductImage
) => {
  const result = await elysia.products({ id }).image.patch(body, {
    fetch: {
      headers: await getHeadersWithoutContentType(),
    },
  });

  return result;
};

export const updateProductData = async (
  id: string,
  body: UpdateProductData
) => {
  const result = await elysia.products({ id }).patch(body, {
    fetch: {
      headers: await headers(),
    },
  });

  return result;
};

export type AdjustQuantityBody = Parameters<
  ReturnType<typeof elysia.products>["stock"]["patch"]
>[0];

export const adjustQuantity = async (id: string, body: AdjustQuantityBody) => {
  const result = await elysia.products({ id }).stock.patch(body, {
    fetch: {
      headers: await headers(),
    },
  });

  return result;
};
