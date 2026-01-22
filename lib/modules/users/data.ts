import { headers } from "next/headers";
import { elysia } from "@/elysia";
import type { SearchQuery } from "@/lib/search-params";
import { authClient } from "../auth/auth-client";
import type { UpdateRoleSchema } from "./schema";

export const getUsers = async (query: SearchQuery) => {
  const { data: response } = await elysia.users.get({
    fetch: {
      headers: await headers(),
    },
    query,
  });

  const data = response?.data;
  return data;
};

export type User = NonNullable<
  Awaited<ReturnType<typeof getUsers>>
>["users"][0];

export const updateUserRole = async (body: UpdateRoleSchema) => {
  const { userId, role } = body;
  const { data, error } = await authClient.admin.setRole({
    userId,
    role,
    fetchOptions: {
      headers: await headers(),
      body: {
        userId,
        role,
      },
    },
  });

  return { data, error };
};
