"use server";

import { actionClient } from "@/lib/safe-action";
import { BundlingsApi } from "./data";
import {
  addBundlingSchema,
  deleteBundlingSchema,
  updateBundlingImageSchema,
  updateBundlingItemsSchema,
  updateBundlingSchema,
} from "./schema";

function extractErrorDetails(error: unknown) {
  const err = error as {
    value?: { messageKey?: string; messageParams?: Record<string, unknown> };
  };
  return {
    messageKey: err?.value?.messageKey,
    messageParams: err?.value?.messageParams as
      | Record<string, unknown>
      | undefined,
  };
}

const errorResult = {
  status: "error" as const,
  message: "Something went wrong",
};

export const addBundlingAction = actionClient
  .inputSchema(addBundlingSchema)
  .action(async ({ parsedInput }) => {
    const result = await BundlingsApi.addBundling(parsedInput);

    if (!result) {
      return errorResult;
    }

    if (result.status !== "success") {
      return {
        ...errorResult,
        message: `Something went wrong. ${result.error?.value?.message}`,
        ...extractErrorDetails(result.error),
      };
    }

    return {
      status: "success" as const,
      message: result.message,
      messageKey: result.messageKey as string | undefined,
      messageParams: result.messageParams as
        | Record<string, unknown>
        | undefined,
    };
  });

export const updateBundlingAction = actionClient
  .inputSchema(updateBundlingSchema)
  .action(async ({ parsedInput }) => {
    const { id, ...rawData } = parsedInput;

    const data = {
      ...rawData,
      maxWeight: rawData.maxWeight ?? null,
      isCustomerOrderable: rawData.isCustomerOrderable ?? null,
    };

    const result = await BundlingsApi.updateBundlingData(id, data);

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

export const updateBundlingItemsAction = actionClient
  .inputSchema(updateBundlingItemsSchema)
  .action(async ({ parsedInput }) => {
    const { id, items } = parsedInput;
    const result = await BundlingsApi.updateBundlingItems(id, items);

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

export const updateBundlingImageAction = actionClient
  .inputSchema(updateBundlingImageSchema)
  .action(async ({ parsedInput }) => {
    const { id, ...body } = parsedInput;
    const result = await BundlingsApi.updateBundlingImage(id, body);
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

export const deleteBundlingAction = actionClient
  .inputSchema(deleteBundlingSchema)
  .action(async ({ parsedInput }) => {
    const { id } = parsedInput;
    const result = await BundlingsApi.deleteBundling(id);

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
