import { headers } from "next/headers";
import { elysia } from "@/elysia";
import type { SearchQuery } from "@/lib/search-params";

export const getMembers = async (query: SearchQuery) => {
  const { data: response } = await elysia.members.get({
    fetch: {
      headers: await headers(),
    },
    query,
  });

  const members = response?.data;

  return members;
};

export type Member = NonNullable<
  Awaited<ReturnType<typeof getMembers>>
>["members"][number];
