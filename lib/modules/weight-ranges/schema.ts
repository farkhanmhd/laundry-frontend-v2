import { z } from "zod";
import { positiveIntNoLeadingZero } from "@/lib/schema-utils";

export const addWeightRangeSchema = z.object({
  label: z.string().min(1),
  minWeight: positiveIntNoLeadingZero,
  maxWeight: positiveIntNoLeadingZero,
});

export type AddWeightRangeSchema = z.infer<typeof addWeightRangeSchema>;

export const updateWeightRangeSchema = z.object({
  id: z.number(),
  label: z.optional(z.string().min(1)),
  minWeight: positiveIntNoLeadingZero,
  maxWeight: positiveIntNoLeadingZero,
  isActive: z.optional(z.boolean()),
});

export type UpdateWeightRangeSchema = z.infer<typeof updateWeightRangeSchema>;
