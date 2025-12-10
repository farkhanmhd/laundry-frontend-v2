import { headers } from "next/headers";
import { elysia } from "@/elysia";

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
