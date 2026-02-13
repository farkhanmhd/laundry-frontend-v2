import { elysia } from "@/elysia";
import { BaseApi } from "@/lib/modules/base-api";

export type UpdateVoucherBody = NonNullable<
  Parameters<ReturnType<typeof elysia.vouchers>["patch"]>[0]
>;

export abstract class VouchersApi extends BaseApi {
  static async getVouchers() {
    const { data: response } = await elysia.vouchers.get({
      ...(await VouchersApi.getConfig()),
    });

    const data = response?.data;
    return data;
  }

  static async getVoucherById(id: string) {
    const { data: response } = await elysia.vouchers({ id }).get({
      ...(await VouchersApi.getConfig()),
    });

    const voucher = response?.data;
    return voucher;
  }

  static async addVoucher(body: Parameters<typeof elysia.vouchers.post>[0]) {
    const result = await elysia.vouchers.post(body, {
      ...(await VouchersApi.getConfig()),
    });

    return result;
  }

  static async deleteVoucher(id: string) {
    const result = await elysia.vouchers({ id }).delete(
      {},
      {
        ...(await VouchersApi.getConfig()),
      }
    );

    return result;
  }

  static async updateVoucher(body: UpdateVoucherBody) {
    const result = await elysia
      .vouchers({ id: body.id as string })
      .patch(body, {
        ...(await VouchersApi.getFormDataConfig()),
      });

    return result;
  }
}

export type Voucher = NonNullable<
  Awaited<ReturnType<typeof VouchersApi.getVoucherById>>
>;
export type VoucherInsert = Parameters<typeof elysia.vouchers.post>[0];
