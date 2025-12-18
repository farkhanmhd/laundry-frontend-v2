"use server";

import type { elysia } from "@/elysia";
import { actionClient } from "@/lib/safe-action";
import {
  addService,
  deleteService,
  updateServiceData,
  updateServiceImage,
} from "./data";
import {
  type AddServiceSchema,
  addServiceSchema,
  deleteServiceSchema,
  updateServiceImageSchema,
  updateServiceSchema,
  // type UpdateServiceBody,
  // updateServiceSchema,
} from "./schema";

export type AddServiceBody = Parameters<typeof elysia.services.post>[0];

export const addServiceAction = actionClient
  .inputSchema(addServiceSchema)
  .action(async ({ parsedInput }) => {
    const result = await addService(parsedInput as AddServiceSchema);

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
        message: "New Service added",
      };
    }
  });

export const deleteServiceAction = actionClient
  .inputSchema(deleteServiceSchema)
  .action(async ({ parsedInput }) => {
    const result = await deleteService(parsedInput.id);

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

export const updateServiceAction = actionClient
  .inputSchema(updateServiceSchema)
  .action(async ({ parsedInput }) => {
    const { id, ...data } = parsedInput;

    const result = await updateServiceData(id, data);

    if (!result || result.error) {
      return errorResult;
    }

    return {
      status: "success",
      message: "Service updated",
    };
  });

export const updateServiceImageAction = actionClient
  .inputSchema(updateServiceImageSchema)
  .action(async ({ parsedInput }) => {
    const { id, ...body } = parsedInput;
    const result = await updateServiceImage(id, body);
    if (!result || result.error) {
      return errorResult;
    }

    return {
      status: "success",
      message: "Inventory updated",
    };
  });
