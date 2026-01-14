import { z } from "zod";
import { positiveIntNoLeadingZero } from "@/lib/schema-utils";

const orderItemSchema = z.object({
  itemType: z.enum(["service", "inventory", "bundling", "voucher"]),
  serviceId: z.optional(z.nullable(z.string())),
  inventoryId: z.optional(z.nullable(z.string())),
  bundlingId: z.optional(z.nullable(z.string())),
  voucherId: z.optional(z.nullable(z.string())),
  note: z.optional(z.nullable(z.string())),
  quantity: positiveIntNoLeadingZero,
});

export type OrderItem = z.infer<typeof orderItemSchema>;

const newPosOrderBaseSchema = {
  customerName: z
    .string()
    .min(2, { error: "Minimum 2 character for customer name" }),
  items: z.array(orderItemSchema),
  memberId: z.string().optional(),
};

export const newPosOrderSchema = z.discriminatedUnion("paymentType", [
  z.object({
    paymentType: z.literal("cash"),
    amountPaid: positiveIntNoLeadingZero,
    ...newPosOrderBaseSchema,
  }),
  z.object({
    paymentType: z.literal("qris"),
    ...newPosOrderBaseSchema,
  }),
]);

export type NewOrderSchema = z.infer<typeof newPosOrderSchema>;
