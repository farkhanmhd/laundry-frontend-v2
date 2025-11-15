"use server";

import { z } from "zod";
import type { elysia } from "@/elysia";
import { actionClient } from "@/lib/safe-action";
import { addVoucher, deleteVoucher, updateVoucher } from "./data";
import { addVoucherSchema } from "./schema";

// --- Type Inference ---
// Infers the expected body type for adding a voucher directly from the Elysia client.
export type AddVoucherBody = Parameters<typeof elysia.vouchers.post>[0];

export const addVoucherAction = actionClient
  .inputSchema(addVoucherSchema)
  .action(async ({ parsedInput }) => {
    // Convert date to ISO string for the API.
    const apiInput = {
      ...parsedInput,
      expiresAt: parsedInput.expiresAt.toISOString(),
    };

    const result = await addVoucher(apiInput);

    if (result.error) {
      return {
        status: "error",
        message: result.error.value.message || "Something went wrong",
      };
    }

    return {
      status: "success",
      message: "New voucher added successfully",
    };
  });

// --- Delete Voucher Action ---
const deleteVoucherSchema = z.object({
  id: z.string(),
});

export const deleteVoucherAction = actionClient
  .inputSchema(deleteVoucherSchema)
  .action(async ({ parsedInput }) => {
    const result = await deleteVoucher(parsedInput.id);

    if (result.error) {
      return {
        status: "error",
        message: "Failed to delete voucher. Something went wrong.",
      };
    }

    return {
      status: "success",
      message: result.data?.message || "Voucher deleted successfully",
    };
  });

// --- Update Voucher Action ---
// Infers the body type for updating a voucher from the Elysia client.
export type UpdateVoucherBody = NonNullable<
  Parameters<ReturnType<typeof elysia.vouchers>["patch"]>[0]
>;

const updateVoucherSchema = addVoucherSchema.partial().extend({
  id: z.string().min(1, "Voucher ID is required"),
});

export type UpdateVoucherSchema = z.infer<typeof updateVoucherSchema>;

export const updateVoucherAction = actionClient
  .inputSchema(updateVoucherSchema)
  .action(async ({ parsedInput }) => {
    const { id, ...restVoucherData } = parsedInput;

    const apiInput = {
      ...restVoucherData,
      expiresAt: restVoucherData.expiresAt?.toISOString(),
    };

    const result = await updateVoucher(id, apiInput);

    if (result.error) {
      return {
        status: "error",
        message: result.error.value.message || "Failed to update voucher.",
      };
    }

    return {
      status: "success",
      message: "Voucher updated successfully",
    };
  });
