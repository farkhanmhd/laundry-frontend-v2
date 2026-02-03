import { z } from "zod";
import { percentageSchema, positiveIntNoLeadingZero } from "@/lib/schema-utils";

// id: TString;
//     code: TString;
//     description: TString;
//     discountPercentage: TUnion<[TString, TNull]>;
//     discountAmount: TUnion<[TInteger, TNull]>;
//     minSpend: TUnion<[TInteger, TNull]>;
//     maxDiscountAmount: TUnion<[TInteger, TNull]>;
//     isVisible: TBoolean;
//     expiresAt: TUnion<[TString, TNull]>;
//     createdAt: TUnion<[TString, TNull]>;
//     deletedAt: TUnion<[TString, TNull]>;

export const voucherInsertSchema = z.object({
  id: z.optional(z.string().min(1, "Voucher ID Required")),
  code: z.string().min(1, "Voucher code is required"),
  description: z.string().min(1, "Voucher description is required"),
  discountPercentage: z.optional(z.nullable(percentageSchema)),
  discountAmount: z.optional(z.nullable(positiveIntNoLeadingZero)),
  minSpend: positiveIntNoLeadingZero,
  maxDiscountAmount: z.optional(z.nullable(positiveIntNoLeadingZero)),
  expiresAt: z.date({ error: "Expiry date is required" }),
  isVisible: z.boolean({ error: "Visibility is required" }),
});

export type VoucherInsertSchema = z.infer<typeof voucherInsertSchema>;
