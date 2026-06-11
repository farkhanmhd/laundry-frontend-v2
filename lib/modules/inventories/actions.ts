"use server";

import { actionClient } from "@/lib/safe-action";
import { InventoriesApi } from "./data";
import {
  addInventorySchema,
  adjustQuantitySchema,
  deleteInventorySchema,
  restockInventorySchema,
  updateInventoryImageSchema,
  updateInventorySchema,
} from "./schema";

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

export const addInventoryAction = actionClient
  .inputSchema(addInventorySchema)
  .action(async ({ parsedInput }) => {
    const result = await InventoriesApi.addInventory(parsedInput);

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
      const data = result.data as
        | {
            message?: string;
            messageKey?: string;
            messageParams?: Record<string, unknown>;
          }
        | undefined;

      return {
        status: "success" as const,
        message: data?.message,
        messageKey: data?.messageKey,
        messageParams: data?.messageParams,
      };
    }
  });

export const deleteInventoryAction = actionClient
  .inputSchema(deleteInventorySchema)
  .action(async ({ parsedInput }) => {
    const result = await InventoriesApi.deleteInventory(parsedInput.id);

    if (!result) {
      return errorResult;
    }

    if (result.status !== 200) {
      const { messageKey, messageParams } = extractErrorDetails(result.error);
      return {
        status: "error" as const,
        message: result.error?.value?.message ?? "Something went wrong",
        messageKey,
        messageParams,
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

export const updateInventoryAction = actionClient
  .inputSchema(updateInventorySchema)
  .action(async ({ parsedInput }) => {
    const { id, ...data } = parsedInput;

    const result = await InventoriesApi.updateInventoryData(id, data);

    if (!result || result.error) {
      return { ...errorResult, ...extractErrorDetails(result?.error) };
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

export const adjustQuantityAction = actionClient
  .inputSchema(adjustQuantitySchema)
  .action(async ({ parsedInput }) => {
    const { id, changeAmount, note, adjustmentTime } = parsedInput;
    const result = await InventoriesApi.adjustQuantity(id, {
      note,
      changeAmount,
      adjustmentTime,
    });

    if (!result || result.error) {
      return { ...errorResult, ...extractErrorDetails(result?.error) };
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

export const updateInventoryImageAction = actionClient
  .inputSchema(updateInventoryImageSchema)
  .action(async ({ parsedInput }) => {
    const { id, ...body } = parsedInput;
    const result = await InventoriesApi.updateInventoryImage(id, body);
    if (!result || result.error) {
      return { ...errorResult, ...extractErrorDetails(result?.error) };
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

export const restockInventoryAction = actionClient
  .inputSchema(restockInventorySchema)
  .action(async ({ parsedInput }) => {
    const { id, restockQuantity, restockTime, supplier, note } = parsedInput;
    const result = await InventoriesApi.restockInventory(id, {
      restockQuantity,
      restockTime,
      supplier,
      note,
    });

    if (!result || result.error) {
      return { ...errorResult, ...extractErrorDetails(result?.error) };
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
