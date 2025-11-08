"use server";

import { actionClient } from "@/lib/safe-action";
import {
  addProduct,
  adjustQuantity,
  deleteProduct,
  updateProductData,
  updateProductImage,
} from "./data";
import {
  addProductSchema,
  adjustQuantitySchema,
  deleteProductSchema,
  updateProductImageSchema,
  updateProductSchema,
} from "./schema";

export const addProductAction = actionClient
  .inputSchema(addProductSchema)
  .action(async ({ parsedInput }) => {
    const result = await addProduct(parsedInput);

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
        message: "New Product added",
      };
    }
  });

export const deleteProductAction = actionClient
  .inputSchema(deleteProductSchema)
  .action(async ({ parsedInput }) => {
    const result = await deleteProduct(parsedInput.id);

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

export const updateProductAction = actionClient
  .inputSchema(updateProductSchema)
  .action(async ({ parsedInput }) => {
    const { id, ...data } = parsedInput;

    const result = await updateProductData(id, data);

    if (!result || result.error) {
      return errorResult;
    }

    return {
      status: "success",
      message: "Product updated",
    };
  });

export const adjustQuantityAction = actionClient
  .inputSchema(adjustQuantitySchema)
  .action(async ({ parsedInput }) => {
    const { id, newQuantity, reason } = parsedInput;
    const result = await adjustQuantity(id, { newQuantity, reason });

    if (!result || result.error) {
      return errorResult;
    }

    return {
      status: "success",
      message: "Quantity Adjusted",
    };
  });

export const updateProductImageAction = actionClient
  .inputSchema(updateProductImageSchema)
  .action(async ({ parsedInput }) => {
    const { id, ...body } = parsedInput;
    const result = await updateProductImage(id, body);
    if (!result || result.error) {
      return errorResult;
    }

    return {
      status: "success",
      message: "Product updated",
    };
  });
