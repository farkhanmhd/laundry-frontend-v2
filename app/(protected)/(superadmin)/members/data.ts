import { headers } from "next/headers";
import { elysia } from "@/elysia";
import type { SearchQuery } from "@/lib/search-params";
import type { AddMemberSchema } from "./schema";

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

export const addMember = async (body: AddMemberSchema) => {
  const result = await elysia.members.post(body, {
    fetch: {
      headers: await headers(),
    },
  });

  return result;
};
