import { headers } from "next/headers";
import { elysia } from "@/elysia";
import { getHeadersWithoutContentType } from "@/lib/modules/auth/auth-helpers";
import type { AddServiceBody } from "./actions";

export const getServices = async () => {
  const { data: response } = await elysia.services.get({
    fetch: {
      headers: await headers(),
    },
  });

  const data = response?.data;

  return data;
};

export const getServiceById = async (id: string) => {
  const { data: response } = await elysia.services({ id }).get({
    fetch: {
      headers: await headers(),
    },
  });

  const data = response?.data;

  return data;
};

export type ServicesArray = Awaited<ReturnType<typeof getServices>>;
export type Service = NonNullable<ServicesArray>[number];

export const addService = async (body: AddServiceBody) => {
  const result = await elysia.services.post(body, {
    fetch: {
      headers: await getHeadersWithoutContentType(),
    },
  });

  return result;
};

export const deleteService = async (id: string) => {
  const result = await elysia.services({ id }).delete(
    {},
    {
      fetch: {
        headers: await headers(),
      },
    }
  );

  return result;
};

export type UpdateServiceData = Parameters<
  ReturnType<typeof elysia.services>["patch"]
>[0];

export type UpdateServiceImage = Parameters<
  ReturnType<typeof elysia.services>["image"]["patch"]
>[0];

export const updateServiceImage = async (
  id: string,
  body: UpdateServiceImage
) => {
  const result = await elysia.services({ id }).image.patch(body, {
    fetch: {
      headers: await getHeadersWithoutContentType(),
    },
  });

  return result;
};

export type UpdateServiceBody = Parameters<
  ReturnType<typeof elysia.services>["patch"]
>[0];

export const updateServiceData = async (
  id: string,
  body: UpdateServiceData
) => {
  const result = await elysia.services({ id }).patch(body, {
    fetch: {
      headers: await headers(),
    },
  });

  return result;
};
