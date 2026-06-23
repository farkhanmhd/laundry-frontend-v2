import { z } from "zod";
import { imageSchema, positiveIntNoLeadingZero } from "@/lib/schema-utils";

const bundlingItem = z
  .object({
    id: z.nullable(z.optional(z.string())),
    serviceId: z.nullable(z.optional(z.string())),
    inventoryId: z.nullable(z.optional(z.string())),
    itemType: z.enum(["service", "inventory"], {
      error: "bundlings.itemType.required",
    }),
    quantity: z
      .number({ error: "bundlings.quantity.required" })
      .min(1, "bundlings.quantity.min"),
  })
  .superRefine((data, ctx) => {
    if (data.itemType === "inventory" && !data.inventoryId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "bundlings.item.required",
        path: ["inventoryId"],
      });
    }
    if (data.itemType === "service" && !data.serviceId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "bundlings.item.required",
        path: ["serviceId"],
      });
    }
  });

export type BundlingItem = z.infer<typeof bundlingItem>;

export const addBundlingSchema = z.object({
  name: z.string().min(1, "bundlings.name.required"),
  image: imageSchema,
  description: z.string().min(1, "bundlings.description.required"),
  price: positiveIntNoLeadingZero,
  items: z
    .array(bundlingItem)
    .min(1, "bundlings.items.min")
    .max(10, "bundlings.items.max"),
  maxWeight: z.optional(positiveIntNoLeadingZero),
  isCustomerOrderable: z.optional(z.nullable(z.boolean())),
});

export type AddBundlingSchema = z.infer<typeof addBundlingSchema>;

export const deleteBundlingSchema = z.object({
  id: z.string(),
});

export const updateBundlingSchema = z.object({
  id: z.string().min(1, "bundlings.id.required"),
  name: z.string().min(1, "bundlings.name.required"),
  description: z.string().min(1, "bundlings.description.required"),
  price: positiveIntNoLeadingZero,
  maxWeight: z.nullable(positiveIntNoLeadingZero),
  isCustomerOrderable: z.nullable(z.boolean()),
});

export const updateBundlingBodySchema = updateBundlingSchema.omit({
  id: true,
});
export type UpdateBundlingSchema = z.infer<typeof updateBundlingSchema>;
export type UpdateBundlingBodySchema = z.infer<typeof updateBundlingBodySchema>;

export const updateBundlingImageSchema = z.object({
  id: z
    .string({
      error: "bundlings.id.required",
    })
    .min(1, { error: "bundlings.id.required" }),
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
