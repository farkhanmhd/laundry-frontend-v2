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
      const errorValue = response.error?.value as
        | {
            messageKey?: string;
            messageParams?: Record<string, unknown>;
            message?: string;
          }
        | undefined;
      return {
        status: "error",
        messageKey: errorValue?.messageKey,
        messageParams: errorValue?.messageParams,
        message: `Something went wrong. ${errorValue?.message}`,
      };
    }

    if (response.data) {
      const resData = response.data as {
        messageKey?: string;
        messageParams?: Record<string, unknown>;
        data: { orderId: string };
      };
      return {
        status: "success",
        messageKey: resData.messageKey,
        messageParams: resData.messageParams,
        message: "New Order Created",
        data: {
          orderId: resData.data.orderId,
        },
      };
    }
  });
