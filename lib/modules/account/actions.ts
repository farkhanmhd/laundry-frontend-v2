"use server";

import { actionClient } from "@/lib/safe-action";
import {
  addressSchema,
  updateAdminSchema,
  updatePasswordSchema,
  updateProfileSchema,
} from "./schema";

export const updateProfileAction = actionClient
  .inputSchema(updateProfileSchema)
  .action(async ({ parsedInput }) => {
    // SIMULATE SERVER DELAY
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Updating user:", parsedInput);

    return {
      status: "success",
      message: "Profile updated successfully",
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
    // SIMULATE SERVER DELAY
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // HERE: You would typically verify the old password matches the DB
    // and then hash and save the new password.
    console.log("Updating password...", "Old:", parsedInput.oldPassword);

    return {
      status: "success",
      message: "Password changed successfully",
    };
  });
