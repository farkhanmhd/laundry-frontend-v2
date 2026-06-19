import { sleep } from "bun";
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

  static async getMockVouchers() {
    await sleep(2000);
    return [
      {
        code: "WELCOME10",
        description: "Diskon untuk member baru di semua layanan cuci.",
        discountPercentage: "10.00",
        discountAmount: null,
        minSpend: 20_000,
        maxDiscountAmount: 15_000,
        expiresAt: "2026-07-19T00:00:00Z",
      },
      {
        code: "WEEKEND15",
        description: "Untuk pesanan antar-jemput setiap Sabtu–Minggu.",
        discountPercentage: "15.00",
        discountAmount: null,
        minSpend: 50_000,
        maxDiscountAmount: 25_000,
        expiresAt: "2026-06-21T00:00:00Z",
      },
      {
        code: "HEMAT5K",
        description: "Potongan langsung untuk semua metode pembayaran.",
        discountPercentage: null,
        discountAmount: 5000,
        minSpend: 30_000,
        maxDiscountAmount: 5000,
        expiresAt: "2026-07-03T00:00:00Z",
      },
      {
        code: "QRIS5K",
        description: "Potongan langsung untuk pembayaran non-tunai via QRIS.",
        discountPercentage: null,
        discountAmount: 5000,
        minSpend: 25_000,
        maxDiscountAmount: 5000,
        expiresAt: null,
      },
    ];
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
