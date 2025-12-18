import { z } from "zod";
import { imageSchema, positiveIntNoLeadingZero } from "@/lib/schema-utils";

const bundlingItem = z.object({
  id: z.nullable(z.optional(z.string())),
  serviceId: z.nullable(z.optional(z.string())),
  inventoryId: z.nullable(z.optional(z.string())),
  itemType: z.enum(["service", "inventory"]),
  quantity: z.number({ error: "Quantity required" }),
});

export type BundlingItem = z.infer<typeof bundlingItem>;

export const addBundlingSchema = z.object({
  name: z.string().min(1, "Bundling name is required"),
  image: imageSchema,
  description: z.string().min(1, "Bundling description is required"),
  price: positiveIntNoLeadingZero,
  items: z
    .array(bundlingItem)
    .min(1, "At least 1 item is required")
    .max(10, "Maximum 10 bundling items allowed"),
});

export type AddBundlingSchema = z.infer<typeof addBundlingSchema>;

export const deleteInventorySchema = z.object({
  id: z.string(),
});

export const updateBundlingSchema = z.object({
  id: z.string().min(1, "Bundling id cannot be empty"),
  name: z.string().min(1, "Bundling name cannot be empty"),
  description: z.string().min(1, "Bundling description is required"),
  price: positiveIntNoLeadingZero,
});

export const updateBundlingBodySchema = updateBundlingSchema.omit({
  id: true,
});
export type UpdateBundlingSchema = z.infer<typeof updateBundlingSchema>;
export type UpdateBundlingBodySchema = z.infer<typeof updateBundlingBodySchema>;

export const updateBundlingImageSchema = z.object({
  id: z
    .string({
      error: "Bundling ID is required.",
    })
    .min(1, { error: "Bundling ID cannot be empty." }),
  image: imageSchema,
});

export type UpdateBundlingImageSchema = z.infer<
  typeof updateBundlingImageSchema
>;

export const updateBundlingItemsSchema = z.object({
  id: z.string(),
  items: z.array(
    bundlingItem.extend({ bundlingId: z.nullable(z.string()).optional() })
  ),
});

export type UpdateBundlingItemSchema = z.infer<
  typeof updateBundlingItemsSchema
>;
