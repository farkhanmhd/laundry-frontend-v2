import { headers } from "next/headers";
import { elysia } from "@/elysia";
import type { NewOrderSchema } from "./schema";

export const getPosItems = async () => {
  const { data } = await elysia.pos.get({
    fetch: {
      headers: await headers(),
    },
  });

  const items = data?.data;
  return items;
};

export type PosItemData = NonNullable<
  Awaited<ReturnType<typeof getPosItems>>
>[0];

export const createNewPosOrder = async (body: NewOrderSchema) => {
  const response = await elysia.pos.new.post(body, {
    fetch: {
      headers: await headers(),
    },
  });

  return response;
};

export type PosCustomer = NonNullable<
  Awaited<ReturnType<typeof getPosMembers>>
>[number];
