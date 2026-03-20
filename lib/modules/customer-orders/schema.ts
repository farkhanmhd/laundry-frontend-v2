import { z } from "zod";
import { orderItemSchema } from "../pos/schema";

export const requestPickupSchema = z.object({
  items: z.array(orderItemSchema),
  addressId: z.string(),
  points: z.optional(z.nullable(z.number())),
});

export type RequestPickupSchema = z.infer<typeof requestPickupSchema>;
