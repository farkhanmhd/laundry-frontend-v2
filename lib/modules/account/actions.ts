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
    const result = await AccountApi.addAddress(parsedInput);

    if (result?.status === "success") {
      return {
        status: "success",
        message: "Address saved successfully",
      };
    }

    return {
      status: "error",
      message: "Failed to save address",
    };
  });

export const getAddressesAction = actionClient.action(async () => {
  const addresses = await AccountApi.getAddresses();
  return {
    status: "success",
    data: addresses,
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
