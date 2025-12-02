"use server";

import { actionClient } from "@/lib/safe-action";
import {
  addBundling,
  // adjustQuantity,
  // deleteInventory,
  updateBundlingData,
  // updateInventoryImage,
} from "./data";
import {
  addBundlingSchema,
  // adjustQuantitySchema,
  // deleteInventorySchema,
  // updateInventoryImageSchema,
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

// export const deleteInventoryAction = actionClient
//   .inputSchema(deleteInventorySchema)
//   .action(async ({ parsedInput }) => {
//     const result = await deleteInventory(parsedInput.id);

//     if (!result) {
//       return {
//         status: "error",
//         message: "Something went wrong",
//       };
//     }

//     if (result.status !== 200) {
//       return {
//         status: "error",
//         message: "Something went wrong",
//       };
//     }

//     return {
//       status: "success",
//       message: result.data?.message,
//     };
//   });

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

// export const updateInventoryImageAction = actionClient
//   .inputSchema(updateInventoryImageSchema)
//   .action(async ({ parsedInput }) => {
//     const { id, ...body } = parsedInput;
//     const result = await updateInventoryImage(id, body);
//     if (!result || result.error) {
//       return errorResult;
//     }

//     return {
//       status: "success",
//       message: "Inventory updated",
//     };
//   });
