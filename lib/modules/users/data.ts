import { elysia } from "@/elysia";
import type { SearchQuery } from "@/lib/search-params";
import { authClient } from "../auth/auth-client";
import type { CreateCashierSchema, UpdateRoleSchema } from "./schema";

export abstract class UsersApi {
  static async getUsers(query: SearchQuery) {
    const { data: response } = await elysia.users.get({
      fetch: {
        credentials: "include",
      },
      query,
    });

    const data = response?.data;
    return data;
  }

  static async updaterequiredRole(body: UpdateRoleSchema) {
    const { userId, role } = body;

    const { data, error } = await authClient.admin.setRole({
      userId,
      role,
      fetchOptions: {
        credentials: "include",
        body: {
          userId,
          role,
        },
      },
    });

    return { data, error };
  }

  static async createCashier(body: CreateCashierSchema) {
    const response = await elysia.users.cashier.post(body, {
      fetch: {
        credentials: "include",
      },
    });

    return response;
  }
}

export type User = NonNullable<
  Awaited<ReturnType<typeof UsersApi.getUsers>>
>["users"][0];
