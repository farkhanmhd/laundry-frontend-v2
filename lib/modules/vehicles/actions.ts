"use server";

import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import { VehiclesApi } from "./data";
import { vehicleSchema } from "./schema";

const errorResult = {
  status: "error" as const,
  message: "Something went wrong",
};

function extractErrorDetails(
  error: { value?: Record<string, unknown> } | undefined | null
) {
  return {
    messageKey: error?.value?.messageKey as string | undefined,
    messageParams: error?.value?.messageParams as
      | Record<string, unknown>
      | undefined,
  };
}

export const createVehicleAction = actionClient
  .inputSchema(vehicleSchema)
  .action(async ({ parsedInput }) => {
    const { id: _, ...body } = parsedInput;
    const result = await VehiclesApi.createVehicle(body);

    if (result.error) {
      return {
        ...errorResult,
        message: result.error.value.message || errorResult.message,
        ...extractErrorDetails(result.error),
      };
    }

    const data = result.data as
      | {
          message?: string;
          messageKey?: string;
          messageParams?: Record<string, unknown>;
        }
      | undefined;

    return {
      status: "success" as const,
      message: data?.message,
      messageKey: data?.messageKey,
      messageParams: data?.messageParams,
    };
  });

export const updateVehicleAction = actionClient
  .inputSchema(vehicleSchema)
  .action(async ({ parsedInput }) => {
    const { id, ...body } = parsedInput;

    if (!id) {
      return {
        ...errorResult,
        message: "Vehicle ID is required for update.",
      };
    }

    const result = await VehiclesApi.updateVehicle(id, body);

    if (result.error) {
      return {
        ...errorResult,
        message: result.error.value.message || "Failed to update vehicle.",
        ...extractErrorDetails(result.error),
      };
    }

    const data = result.data as
      | {
          message?: string;
          messageKey?: string;
          messageParams?: Record<string, unknown>;
        }
      | undefined;

    return {
      status: "success" as const,
      message: data?.message,
      messageKey: data?.messageKey,
      messageParams: data?.messageParams,
    };
  });

const deleteVehicleSchema = z.object({
  id: z.string(),
});

export const deleteVehicleAction = actionClient
  .inputSchema(deleteVehicleSchema)
  .action(async ({ parsedInput }) => {
    const result = await VehiclesApi.deleteVehicle(parsedInput.id);

    if (result.error) {
      return {
        ...errorResult,
        message: result.error.value.message || "Failed to delete vehicle.",
        ...extractErrorDetails(result.error),
      };
    }

    const data = result.data as
      | {
          message?: string;
          messageKey?: string;
          messageParams?: Record<string, unknown>;
        }
      | undefined;

    return {
      status: "success" as const,
      message: data?.message,
      messageKey: data?.messageKey,
      messageParams: data?.messageParams,
    };
  });
