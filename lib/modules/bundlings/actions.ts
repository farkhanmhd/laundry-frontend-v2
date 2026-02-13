"use server";

import { actionClient } from "@/lib/safe-action";
import { BundlingsApi } from "./data";
import {
  addBundlingSchema,
  updateBundlingImageSchema,
  updateBundlingItemsSchema,
  updateBundlingSchema,
} from "./schema";

export const addBundlingAction = actionClient
  .inputSchema(addBundlingSchema)
  .action(async ({ parsedInput }) => {
    const result = await BundlingsApi.addBundling(parsedInput);

    if (!result) {
      return {
        status: "error",
        message: "Something went wrong",
      };
    }

    if (result.status !== "success") {
      return {
        status: "error",
        message: `Something went wrong. ${result.error?.value?.message}`,
      };
    }

    return {
      status: "success",
      message: "New Bundling added",
    };
  });

const errorResult = {
  status: "error",
  message: "Something went wrong",
};

export const updateBundlingAction = actionClient
  .inputSchema(updateBundlingSchema)
  .action(async ({ parsedInput }) => {
    const { id, ...data } = parsedInput;

    const result = await BundlingsApi.updateBundlingData(id, data);

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
    const result = await BundlingsApi.updateBundlingItems(id, items);

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
    const result = await BundlingsApi.updateBundlingImage(id, body);
    if (!result || result.error) {
      return errorResult;
    }

    return {
      status: "success",
      message: "Inventory updated",
    };
  });
