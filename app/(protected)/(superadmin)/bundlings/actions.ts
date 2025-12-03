"use server";

import { actionClient } from "@/lib/safe-action";
import {
  addBundling,
  updateBundlingData,
  updateBundlingImage,
  updateBundlingItems,
} from "./data";
import {
  addBundlingSchema,
  updateBundlingImageSchema,
  updateBundlingItemsSchema,
  updateBundlingSchema,
} from "./schema";

export const addBundlingAction = actionClient
  .inputSchema(addBundlingSchema)
  .action(async ({ parsedInput }) => {
    const result = await addBundling(parsedInput);

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

const errorResult = {
  status: "error",
  message: "Something went wrong",
};

export const updateBundlingAction = actionClient
  .inputSchema(updateBundlingSchema)
  .action(async ({ parsedInput }) => {
    const { id, ...data } = parsedInput;

    const result = await updateBundlingData(id, data);

    if (!result || result.error) {
      return errorResult;
    }

    return {
      status: "success",
      message: "Bundling updated",
    };
  });

export const updateBundlingItemsAction = actionClient
  .inputSchema(updateBundlingItemsSchema)
  .action(async ({ parsedInput }) => {
    const { id, items } = parsedInput;
    const result = await updateBundlingItems(id, items);

    if (!result || result.error) {
      return errorResult;
    }

    return {
      status: "success",
      message: "Bundling updated",
    };
  });

export const updateBundlingImageAction = actionClient
  .inputSchema(updateBundlingImageSchema)
  .action(async ({ parsedInput }) => {
    const { id, ...body } = parsedInput;
    const result = await updateBundlingImage(id, body);
    if (!result || result.error) {
      return errorResult;
    }

    return {
      status: "success",
      message: "Inventory updated",
    };
  });
