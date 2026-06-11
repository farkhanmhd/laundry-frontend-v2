"use server";

import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import { AssetsApi } from "./data";
import { assetSchema } from "./schema";

const errorResult = {
  status: "error" as const,
  message: "Something went wrong",
};

function extractErrorDetails(error: { value?: Record<string, unknown> } | undefined | null) {
  return {
    messageKey: error?.value?.messageKey as string | undefined,
    messageParams: error?.value?.messageParams as Record<string, unknown> | undefined,
  };
}

export const createAssetAction = actionClient
  .inputSchema(assetSchema)
  .action(async ({ parsedInput }) => {
    const { id: _, ...body } = parsedInput;
    const result = await AssetsApi.createAsset(body);

    if (result.error) {
      return {
        ...errorResult,
        message: result.error.value.message || errorResult.message,
        ...extractErrorDetails(result.error),
      };
    }

    const data = result.data as
      | { message?: string; messageKey?: string; messageParams?: Record<string, unknown> }
      | undefined;

    return {
      status: "success" as const,
      message: data?.message,
      messageKey: data?.messageKey,
      messageParams: data?.messageParams,
    };
  });

export const updateAssetAction = actionClient
  .inputSchema(assetSchema)
  .action(async ({ parsedInput }) => {
    const { id, ...body } = parsedInput;

    if (!id) {
      return {
        ...errorResult,
        message: "Asset ID is required for update.",
      };
    }

    const result = await AssetsApi.updateAsset(id, body);

    if (result.error) {
      return {
        ...errorResult,
        message: result.error.value.message || "Failed to update asset.",
        ...extractErrorDetails(result.error),
      };
    }

    const data = result.data as
      | { message?: string; messageKey?: string; messageParams?: Record<string, unknown> }
      | undefined;

    return {
      status: "success" as const,
      message: data?.message,
      messageKey: data?.messageKey,
      messageParams: data?.messageParams,
    };
  });

const deleteAssetSchema = z.object({
  id: z.string(),
});

export const deleteAssetAction = actionClient
  .inputSchema(deleteAssetSchema)
  .action(async ({ parsedInput }) => {
    const result = await AssetsApi.deleteAsset(parsedInput.id);

    if (result.error) {
      return {
        ...errorResult,
        message: result.error.value.message || "Failed to delete asset.",
        ...extractErrorDetails(result.error),
      };
    }

    const data = result.data as
      | { message?: string; messageKey?: string; messageParams?: Record<string, unknown> }
      | undefined;

    return {
      status: "success" as const,
      message: data?.message,
      messageKey: data?.messageKey,
      messageParams: data?.messageParams,
    };
  });
