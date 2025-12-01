"use server";

import type { elysia } from "@/elysia";
import { actionClient } from "@/lib/safe-action";
import { addMember } from "./data";
import { addMemberSchema } from "./schema";

export type AddServiceBody = Parameters<typeof elysia.services.post>[0];

export const addMemberAction = actionClient
  .inputSchema(addMemberSchema)
  .action(async ({ parsedInput }) => {
    const result = await addMember(parsedInput);

    if (!result) {
      return {
        status: "error",
        message: "Something went wrong",
      };
    }

    if (result.status !== 201) {
      return {
        status: "error",
        message: `Something went wrong. ${result.error?.value?.message}`,
      };
    }

    if (result.data) {
      return {
        status: "success",
        message: "New Member added",
      };
    }
  });
