"use server";

import { actionClient } from "@/lib/safe-action";
import { AccountApi } from "./data";
import {
  addressSchema,
  updateAdminSchema,
  updatePasswordSchema,
  updateProfileSchema,
} from "./schema";

export const updateProfileAction = actionClient
  .inputSchema(updateProfileSchema)
  .action(async ({ parsedInput }) => {
    const result = await AccountApi.updateProfile(parsedInput);

    if (result?.status === "success") {
      return {
        status: "success",
        message: "Profile updated successfully",
      };
    }

    return {
      status: "error",
      message: "Failed to update profile",
    };
  });

export const updateAdminAction = actionClient
  .inputSchema(updateAdminSchema)
  .action(async ({ parsedInput }) => {
    // SIMULATE SERVER DELAY
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Updating user:", parsedInput);

    return {
      status: "success",
      message: "Profile updated successfully",
    };
  });

export const addAddressAction = actionClient
  .inputSchema(addressSchema)
  .action(async ({ parsedInput }) => {
    // SIMULATE DB DELAY
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newAddress = {
      id: Math.random().toString(36).substr(2, 9),
      ...parsedInput,
    };

    // Return a structured response matching your hook's check
    return {
      status: "success",
      message: "Address saved successfully",
      data: newAddress,
    };
  });

export const updatePasswordAction = actionClient
  .inputSchema(updatePasswordSchema)
  .action(async ({ parsedInput }) => {
    const result = await AccountApi.updatePassword(parsedInput);

    if (result?.status === "success") {
      return {
        status: "success",
        message: "Password updated successfully",
      };
    }

    return {
      status: "error",
      message: "Failed to update profile",
    };
  });
