import { headers } from "next/headers";
import { elysia } from "@/elysia";
import { BaseApi } from "@/lib/modules/base-api";
import type { SearchQuery } from "@/lib/search-params";
import { authClient } from "../auth/auth-client";
import type { UpdateRoleSchema } from "./schema";

export abstract class UsersApi extends BaseApi {
  static async getUsers(query: SearchQuery) {
    const { data: response } = await elysia.users.get({
      ...(await UsersApi.getConfig()),
      query,
    });

    const data = response?.data;
    return data;
  }

  static async updateUserRole(body: UpdateRoleSchema) {
    const { userId, role } = body;
    const headerList = await headers();
    const cookieHeader = headerList.get("cookie") || "";

    const { data, error } = await authClient.admin.setRole({
      userId,
      role,
      fetchOptions: {
        headers: {
          Cookie: cookieHeader,
        },
        body: {
          userId,
          role,
        },
      },
    });

    return { data, error };
  }
}

export type User = NonNullable<
  Awaited<ReturnType<typeof UsersApi.getUsers>>
>["users"][0];
