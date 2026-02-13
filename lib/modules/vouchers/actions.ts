"use server";

import { z } from "zod";
import type { elysia } from "@/elysia";
import { actionClient } from "@/lib/safe-action";
import { type VoucherInsert, VouchersApi } from "./data";
import { voucherInsertSchema } from "./schema";

export const addVoucherAction = actionClient
  .inputSchema(voucherInsertSchema)
  .action(async ({ parsedInput }) => {
    const apiInput: VoucherInsert = {
      ...parsedInput,
      maxDiscountAmount:
        parsedInput.discountAmount && parsedInput.discountAmount > 0
          ? parsedInput.discountAmount
          : (parsedInput.maxDiscountAmount as number),
      expiresAt: parsedInput.expiresAt.toISOString(),
    };

    const result = await VouchersApi.addVoucher(apiInput);

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

const deleteVoucherSchema = z.object({
  id: z.string(),
});

export const deleteVoucherAction = actionClient
  .inputSchema(deleteVoucherSchema)
  .action(async ({ parsedInput }) => {
    const result = await VouchersApi.deleteVoucher(parsedInput.id);

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
          : (parsedInput.maxDiscountAmount as number),
      expiresAt: parsedInput.expiresAt?.toISOString(),
    };

    const result = await VouchersApi.updateVoucher(apiInput);

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
