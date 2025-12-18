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
