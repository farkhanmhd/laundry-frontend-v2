"use server";

import { flattenValidationErrors } from "next-safe-action";
import { actionClient } from "@/lib/safe-action";
import { CustomerOrdersApi } from "./data";
import { requestPickupSchema } from "./schema";

export const createPickupRequest = actionClient
  .inputSchema(requestPickupSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput }) => {
    const response = await CustomerOrdersApi.createPickupRequest(parsedInput);

    if (!response) {
      return {
        status: "error",
        message: "Something went wrong",
      };
    }

    if (response.status !== 201) {
      return {
        status: "error",
        message: `Something went wrong. ${response.error?.value.message}`,
      };
    }

    if (response.data) {
      return {
        status: "success",
        message: response.data.message,
        data: {
          orderId: response.data.data.orderId,
        },
      };
    }
  });
