import { z } from "zod";
import { positiveIntNoLeadingZero } from "@/lib/schema-utils";

export const addVoucherSchema = z.object({
  name: z.string().min(1, "Voucher name is required"),
  code: z.string().min(1, "Voucher code is required"),
  discountAmount: positiveIntNoLeadingZero,
  pointsCost: positiveIntNoLeadingZero,
  expiresAt: z.date({ error: "Expiry date is required" }),
});

export type AddVoucherSchema = z.infer<typeof addVoucherSchema>;
