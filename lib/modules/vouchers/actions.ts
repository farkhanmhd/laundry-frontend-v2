"use server";

import { z } from "zod";
import type { elysia } from "@/elysia";
import { actionClient } from "@/lib/safe-action";
import { type VoucherInsert, VouchersApi } from "./data";
import { voucherInsertSchema } from "./schema";

const errorResult = {
  status: "error" as const,
  message: "Something went wrong",
};

function extractErrorDetails(error: { value?: Record<string, unknown> } | undefined | null) {
  return {
    messageKey: error?.value?.messageKey as string | undefined,
    messageParams: error?.value?.messageParams as Record<string, unknown> | undefined,
  };
}

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
        ...errorResult,
        message: result.error.value.message || errorResult.message,
        ...extractErrorDetails(result.error),
      };
    }

    const data = result.data as
      | { message?: string; messageKey?: string; messageParams?: Record<string, unknown> }
      | undefined;

    return {
      status: "success" as const,
      message: data?.message,
      messageKey: data?.messageKey,
      messageParams: data?.messageParams,
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
        ...errorResult,
        message: result.error.value.message || "Failed to delete voucher.",
        ...extractErrorDetails(result.error),
      };
    }

    const data = result.data as
      | { message?: string; messageKey?: string; messageParams?: Record<string, unknown> }
      | undefined;

    return {
      status: "success" as const,
      message: data?.message,
      messageKey: data?.messageKey,
      messageParams: data?.messageParams,
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
        ...errorResult,
        message: result.error.value.message || "Failed to update voucher.",
        ...extractErrorDetails(result.error),
      };
    }

    const data = result.data as
      | { message?: string; messageKey?: string; messageParams?: Record<string, unknown> }
      | undefined;

    return {
      status: "success" as const,
      message: data?.message,
      messageKey: data?.messageKey,
      messageParams: data?.messageParams,
    };
  });
