"use server";

import { actionClient } from "@/lib/safe-action";
import { WeightRangesApi } from "./data";
import { addWeightRangeSchema, updateWeightRangeSchema } from "./schema";

const errorResult = {
  status: "error" as const,
  message: "Something went wrong",
};

function extractErrorDetails(
  error: { value?: Record<string, unknown> } | undefined | null
) {
  return {
    messageKey: error?.value?.messageKey as string | undefined,
    messageParams: error?.value?.messageParams as
      | Record<string, unknown>
      | undefined,
  };
}

export const addWeightRangeAction = actionClient
  .inputSchema(addWeightRangeSchema)
  .action(async ({ parsedInput }) => {
    const result = await WeightRangesApi.create(parsedInput);

    if (!result) {
      return errorResult;
    }

    if (result.status !== 201) {
      const { messageKey, messageParams } = extractErrorDetails(result.error);
      return {
        status: "error" as const,
        message: `Something went wrong. ${result.error?.value?.message}`,
        messageKey,
        messageParams,
      };
    }

    if (result.data) {
      const successData = result.data as
        | {
            message?: string;
            messageKey?: string;
            messageParams?: Record<string, unknown>;
          }
        | undefined;

      return {
        status: "success" as const,
        message: successData?.message,
        messageKey: successData?.messageKey,
        messageParams: successData?.messageParams,
      };
    }

    return errorResult;
  });

export const updateWeightRangeAction = actionClient
  .inputSchema(updateWeightRangeSchema)
  .action(async ({ parsedInput }) => {
    const { id, ...data } = parsedInput;

    const result = await WeightRangesApi.update(id, data);

    if (!result || result.error) {
      return {
        ...errorResult,
        ...extractErrorDetails(result?.error),
      };
    }

    const successData = result.data as
      | {
          message?: string;
          messageKey?: string;
          messageParams?: Record<string, unknown>;
        }
      | undefined;

    return {
      status: "success" as const,
      message: successData?.message,
      messageKey: successData?.messageKey,
      messageParams: successData?.messageParams,
    };
  });
