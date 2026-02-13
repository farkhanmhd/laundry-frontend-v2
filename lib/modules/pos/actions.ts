"use server";

import { flattenValidationErrors } from "next-safe-action";
import { actionClient } from "@/lib/safe-action";
import { PosApi } from "./data";
import { newPosOrderSchema } from "./schema";

export const createPosOrderAction = actionClient
  .inputSchema(newPosOrderSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput }) => {
    const response = await PosApi.createNewPosOrder(parsedInput);
    if (!response) {
      return {
        status: "error",
        message: "Something went wrong",
      };
    }

    if (response.status !== 201) {
      return {
        status: "error",
        message: `Something went wrong. ${response.error?.value?.message}`,
      };
    }

    if (response.data) {
      return {
        status: "success",
        message: "New Order Created",
        data: {
          orderId: response.data.data.orderId,
        },
      };
    }
  });
