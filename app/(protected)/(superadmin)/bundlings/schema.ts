import { z } from "zod";
import { imageSchema, positiveIntNoLeadingZero } from "@/lib/schema-utils";

const bundlingItems = z.object({
  serviceId: z.nullable(z.optional(z.string())),
  inventoryId: z.nullable(z.optional(z.string())),
  itemType: z.enum(["service", "inventory"]),
  quantity: z.number({ error: "Quantity required" }),
});

export const addBundlingSchema = z.object({
  name: z.string().min(1, "Bundling name is required"),
  image: imageSchema,
  description: z.string().min(1, "Bundling description is required"),
  price: positiveIntNoLeadingZero,
  items: z
    .array(bundlingItems)
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
  isActive: z.boolean(),
});

export const updateBundlingBodySchema = updateBundlingSchema.omit({
  id: true,
});
export type UpdateBundlingSchema = z.infer<typeof updateBundlingSchema>;
export type UpdateBundlingBodySchema = z.infer<typeof updateBundlingBodySchema>;

export const adjustQuantitySchema = z
  .object({
    id: z
      .string({
        error: "Inventory ID is required.",
      })
      .min(1, { error: "Inventory ID cannot be empty." }),
    currentQuantity: positiveIntNoLeadingZero,
    newQuantity: positiveIntNoLeadingZero,
    reason: z
      .string({
        error: "A reason for the adjustment is required.",
      })
      .min(5, { error: "Please provide a reason (at least 5 characters)." })
      .max(500, { error: "The reason must be 500 characters or less." }),
  })
  .refine((data) => data.newQuantity !== data.currentQuantity, {
    error: "New quantity must be different from the current quantity.",
    path: ["newQuantity"], // Where to display this error
  });

export type AdjustQuantitySchema = z.infer<typeof adjustQuantitySchema>;

export const updateInventoryImageSchema = z.object({
  id: z
    .string({
      error: "Inventory ID is required.",
    })
    .min(1, { error: "Inventory ID cannot be empty." }),
  image: imageSchema,
});

export type UpdateInventoryImageSchema = z.infer<
  typeof updateInventoryImageSchema
>;
