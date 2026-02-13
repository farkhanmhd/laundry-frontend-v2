"use server";

import { actionClient } from "@/lib/safe-action";
import { InventoriesApi } from "./data";
import {
  addInventorySchema,
  adjustQuantitySchema,
  deleteInventorySchema,
  updateInventoryImageSchema,
  updateInventorySchema,
} from "./schema";

export const addInventoryAction = actionClient
  .inputSchema(addInventorySchema)
  .action(async ({ parsedInput }) => {
    const result = await InventoriesApi.addInventory(parsedInput);

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
        message: "New Inventory added",
      };
    }
  });

export const deleteInventoryAction = actionClient
  .inputSchema(deleteInventorySchema)
  .action(async ({ parsedInput }) => {
    const result = await InventoriesApi.deleteInventory(parsedInput.id);

    if (!result) {
      return {
        status: "error",
        message: "Something went wrong",
      };
    }

    if (result.status !== 200) {
      return {
        status: "error",
        message: "Something went wrong",
      };
    }

    return {
      status: "success",
      message: result.data?.message,
    };
  });

const errorResult = {
  status: "error",
  message: "Something went wrong",
};

export const updateInventoryAction = actionClient
  .inputSchema(updateInventorySchema)
  .action(async ({ parsedInput }) => {
    const { id, ...data } = parsedInput;

    const result = await InventoriesApi.updateInventoryData(id, data);

    if (!result || result.error) {
      return errorResult;
    }

    return {
      status: "success",
      message: "Inventory updated",
    };
  });

export const adjustQuantityAction = actionClient
  .inputSchema(adjustQuantitySchema)
  .action(async ({ parsedInput }) => {
    const { id, changeAmount, note, type } = parsedInput;
    const result = await InventoriesApi.adjustQuantity(id, {
      note,
      changeAmount,
      type,
    });

    if (!result || result.error) {
      return errorResult;
    }

    return {
      status: "success",
      message: "Quantity Adjusted",
    };
  });

export const updateInventoryImageAction = actionClient
  .inputSchema(updateInventoryImageSchema)
  .action(async ({ parsedInput }) => {
    const { id, ...body } = parsedInput;
    const result = await InventoriesApi.updateInventoryImage(id, body);
    if (!result || result.error) {
      return errorResult;
    }

    return {
      status: "success",
      message: "Inventory updated",
    };
  });
