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
        status: "error" as const,
        message: "Something went wrong",
      };
    }

    if (result.status !== 201) {
      return {
        status: "error" as const,
        message: `Something went wrong. ${result.error?.value?.message}`,
        messageKey: (result.error?.value as { messageKey?: string })?.messageKey,
        messageParams: (result.error?.value as { messageParams?: Record<string, unknown> })?.messageParams,
      };
    }

    if (result.data) {
      return {
        status: "success" as const,
        message: "New Member added",
        messageKey: (result.data as { messageKey?: string })?.messageKey,
        messageParams: (result.data as { messageParams?: Record<string, unknown> })?.messageParams,
      };
    }
  });
