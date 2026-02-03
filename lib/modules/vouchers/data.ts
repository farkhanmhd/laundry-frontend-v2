import { headers } from "next/headers";
import { elysia } from "@/elysia";
import { getHeadersWithoutContentType } from "@/lib/modules/auth/auth-helpers";

/**
 * Fetches all vouchers from the API.
 * It passes along the necessary headers for authentication.
 */
export const getVouchers = async () => {
  const { data: response } = await elysia.vouchers.get({
    fetch: {
      headers: await headers(),
    },
  });

  const data = response?.data;
  return data;
};

export const getVoucherById = async (id: string) => {
  const { data: response } = await elysia.vouchers({ id }).get({
    fetch: {
      headers: await headers(),
    },
  });

  const voucher = response?.data;
  return voucher;
};

export type Voucher = NonNullable<Awaited<ReturnType<typeof getVoucherById>>>;
export type VoucherInsert = Parameters<typeof elysia.vouchers.post>[0];
/**
 * Sends a request to create a new voucher.
 * @param body - The voucher data to be created.
 */
export const addVoucher = async (body: VoucherInsert) => {
  const result = await elysia.vouchers.post(body, {
    fetch: {
      headers: await headers(),
    },
  });

  return result;
};

/**
 * Sends a request to delete a specific voucher by its ID.
 * @param id - The ID of the voucher to delete.
 */
export const deleteVoucher = async (id: string) => {
  const result = await elysia.vouchers({ id }).delete(
    {},
    {
      fetch: {
        headers: await headers(),
      },
    }
  );

  return result;
};

/**
 * Sends a request to update a specific voucher by its ID.
 * @param id - The ID of the voucher to update.
 * @param body - The new data for the voucher.
 */
export const updateVoucher = async (body: VoucherInsert) => {
  const result = await elysia.vouchers({ id: body.id as string }).patch(body, {
    fetch: {
      headers: await getHeadersWithoutContentType(),
    },
  });

  return result;
};
