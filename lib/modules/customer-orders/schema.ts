import { z } from "zod";
import { orderItemSchema } from "../pos/schema";

const pickupOrderItemSchema = orderItemSchema.extend({
  quantity: z.number().positive(),
});

export const requestPickupSchema = z.object({
  items: z.array(pickupOrderItemSchema),
  addressId: z.string(),
  points: z.optional(z.nullable(z.number())),
  requestTime: z.string(),
  weightRangeId: z.number(),
  weight: z.optional(z.nullable(z.number())),
});

export type RequestPickupSchema = z.infer<typeof requestPickupSchema>;
