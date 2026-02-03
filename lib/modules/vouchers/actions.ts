"use server";

import { z } from "zod";
import type { elysia } from "@/elysia";
import { actionClient } from "@/lib/safe-action";
import {
  addVoucher,
  deleteVoucher,
  updateVoucher,
  type VoucherInsert,
} from "./data";
import { voucherInsertSchema } from "./schema";

// --- Type Inference ---
// Infers the expected body type for adding a voucher directly from the Elysia client.

export const addVoucherAction = actionClient
  .inputSchema(voucherInsertSchema)
  .action(async ({ parsedInput }) => {
    // Convert date to ISO string for the API.
    const apiInput: VoucherInsert = {
      ...parsedInput,
      maxDiscountAmount:
        parsedInput.discountAmount && parsedInput.discountAmount > 0
          ? parsedInput.discountAmount
          : parsedInput.maxDiscountAmount,
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

export const updateVoucherAction = actionClient
  .inputSchema(voucherInsertSchema)
  .action(async ({ parsedInput }) => {
    const apiInput: VoucherInsert = {
      ...parsedInput,
      maxDiscountAmount:
        parsedInput.discountAmount && parsedInput.discountAmount > 0
          ? parsedInput.discountAmount
          : parsedInput.maxDiscountAmount,
      expiresAt: parsedInput.expiresAt?.toISOString(),
    };

    const result = await updateVoucher(apiInput);

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
