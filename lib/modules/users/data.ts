import { headers } from "next/headers";
import { elysia } from "@/elysia";
import type { SearchQuery } from "@/lib/search-params";

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  image: string | null;
  username: string | null;
  role: "superadmin" | "admin" | "user";
};

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
