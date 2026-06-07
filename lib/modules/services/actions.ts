"use server";

import type { elysia } from "@/elysia";
import { actionClient } from "@/lib/safe-action";
import { ServicesApi } from "./data";
import {
  type AddServiceSchema,
  addServiceSchema,
  deleteServiceSchema,
  updateServiceImageSchema,
  updateServiceSchema,
} from "./schema";

export type AddServiceBody = Parameters<typeof elysia.services.post>[0];

function extractErrorDetails(error: unknown) {
  const err = error as {
    value?: { messageKey?: string; messageParams?: Record<string, unknown> };
  };
  return {
    messageKey: err?.value?.messageKey,
    messageParams: err?.value?.messageParams as Record<string, unknown> | undefined,
  };
}

const errorResult = {
  status: "error" as const,
  message: "Something went wrong",
};

export const addServiceAction = actionClient
  .inputSchema(addServiceSchema)
  .action(async ({ parsedInput }) => {
    const result = await ServicesApi.addService(
      parsedInput as AddServiceSchema
    );

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
        | { message?: string; messageKey?: string; messageParams?: Record<string, unknown> }
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

export const deleteServiceAction = actionClient
  .inputSchema(deleteServiceSchema)
  .action(async ({ parsedInput }) => {
    const result = await ServicesApi.deleteService(parsedInput.id);

    if (!result) {
      return errorResult;
    }

    if (result.status !== 200) {
      const { messageKey, messageParams } = extractErrorDetails(result.error);
      return {
        status: "error" as const,
        message: `Something went wrong`,
        messageKey,
        messageParams,
      };
    }

    const successData = result.data as
      | { message?: string; messageKey?: string; messageParams?: Record<string, unknown> }
      | undefined;

    return {
      status: "success" as const,
      message: successData?.message,
      messageKey: successData?.messageKey,
      messageParams: successData?.messageParams,
    };
  });

export const updateServiceAction = actionClient
  .inputSchema(updateServiceSchema)
  .action(async ({ parsedInput }) => {
    const { id, ...data } = parsedInput;

    const result = await ServicesApi.updateServiceData(id, data);

    if (!result || result.error) {
      return {
        ...errorResult,
        ...extractErrorDetails(result?.error),
      };
    }

    const successData = result.data as
      | { message?: string; messageKey?: string; messageParams?: Record<string, unknown> }
      | undefined;

    return {
      status: "success" as const,
      message: successData?.message,
      messageKey: successData?.messageKey,
      messageParams: successData?.messageParams,
    };
  });

export const updateServiceImageAction = actionClient
  .inputSchema(updateServiceImageSchema)
  .action(async ({ parsedInput }) => {
    const { id, ...body } = parsedInput;
    const result = await ServicesApi.updateServiceImage(id, body);
    if (!result || result.error) {
      return {
        ...errorResult,
        ...extractErrorDetails(result?.error),
      };
    }

    const successData = result.data as
      | { message?: string; messageKey?: string; messageParams?: Record<string, unknown> }
      | undefined;

    return {
      status: "success" as const,
      message: successData?.message,
      messageKey: successData?.messageKey,
      messageParams: successData?.messageParams,
    };
  });
