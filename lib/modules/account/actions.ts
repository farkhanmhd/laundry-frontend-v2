"use server";

import { actionClient } from "@/lib/safe-action";
import { AccountApi } from "./data";
import {
  addressSchema,
  updateAddressSchemaWithId,
  updateAdminSchema,
  updatePasswordSchema,
  updateProfileSchema,
} from "./schema";

function extractErrorDetails(error: unknown) {
  const err = error as {
    value?: { messageKey?: string; messageParams?: Record<string, unknown> };
  };
  return {
    messageKey: err?.value?.messageKey,
    messageParams: err?.value?.messageParams as
      | Record<string, unknown>
      | undefined,
  };
}

export const updateProfileAction = actionClient
  .inputSchema(updateProfileSchema)
  .action(async ({ parsedInput }) => {
    const response = await AccountApi.updateProfile(parsedInput);

    if (response?.data?.status === "success") {
      return {
        status: "success" as const,
        message: (response.data as { message?: string }).message,
        messageKey: (response.data as { messageKey?: string }).messageKey,
        messageParams: (
          response.data as { messageParams?: Record<string, unknown> }
        ).messageParams,
      };
    }

    if (response?.status === 409) {
      return {
        status: "error" as const,
        message: "Username already taken",
        ...extractErrorDetails(response.error),
      };
    }

    return {
      status: "error" as const,
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
      status: "success" as const,
      message: "Profile updated successfully",
    };
  });

export const addAddressAction = actionClient
  .inputSchema(addressSchema)
  .action(async ({ parsedInput }) => {
    const response = await AccountApi.addAddress(parsedInput);

    if ((response as { status?: string })?.status === "success") {
      return {
        status: "success" as const,
        message: (response as { message?: string }).message,
        messageKey: (response as { messageKey?: string }).messageKey,
        messageParams: (response as { messageParams?: Record<string, unknown> })
          .messageParams,
      };
    }

    return {
      status: "error" as const,
      message: "Failed to save address",
    };
  });

export const updateAddressAction = actionClient
  .inputSchema(updateAddressSchemaWithId)
  .action(async ({ parsedInput }) => {
    const { id, ...body } = parsedInput;
    const response = await AccountApi.updateAddress({ id, body });

    if ((response as { status?: string })?.status === "success") {
      return {
        status: "success" as const,
        message: (response as { message?: string }).message,
        messageKey: (response as { messageKey?: string }).messageKey,
        messageParams: (response as { messageParams?: Record<string, unknown> })
          .messageParams,
      };
    }

    return {
      status: "error" as const,
      message: "Failed to update address",
    };
  });

export const getAddressesAction = actionClient.action(async () => {
  const addresses = await AccountApi.getAddresses();
  return {
    status: "success" as const,
    data: addresses,
  };
});

export const updatePasswordAction = actionClient
  .inputSchema(updatePasswordSchema)
  .action(async ({ parsedInput }) => {
    const response = await AccountApi.updatePassword(parsedInput);

    if ((response as { status?: string })?.status === "success") {
      return {
        status: "success" as const,
        message: (response as { message?: string }).message,
        messageKey: (response as { messageKey?: string }).messageKey,
        messageParams: (response as { messageParams?: Record<string, unknown> })
          .messageParams,
      };
    }

    return {
      status: "error" as const,
      message: "Failed to update profile",
    };
  });
