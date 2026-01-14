"use server";

import { actionClient } from "@/lib/safe-action";
import { createNewPosOrder } from "./data";
import { newPosOrderSchema } from "./schema";

export const createPosOrderAction = actionClient
  .inputSchema(newPosOrderSchema)
  .action(async ({ parsedInput }) => {
    const response = await createNewPosOrder(parsedInput);
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
