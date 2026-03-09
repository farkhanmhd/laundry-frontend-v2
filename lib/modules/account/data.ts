import { elysia } from "@/elysia";
import { BaseApi } from "../base-api";
import type { UpdatePasswordSchema, UpdateProfileSchema } from "./schema";

export abstract class AccountApi extends BaseApi {
  static async getAccountInfo() {
    const { data: response } = await elysia.account.info.get({
      ...(await AccountApi.getConfig()),
    });

    const data = response?.data;
    return data;
  }

  static async updateProfile(body: UpdateProfileSchema) {
    const { data: response } = await elysia.account.info.patch(body, {
      ...(await AccountApi.getConfig()),
    });

    return response;
  }

  static async updatePassword(body: UpdatePasswordSchema) {
    const { data: response } = await elysia.account.password.patch(body, {
      ...(await AccountApi.getConfig()),
    });

    return response;
  }
}

export type AccountInfo = Awaited<ReturnType<typeof AccountApi.getAccountInfo>>;
