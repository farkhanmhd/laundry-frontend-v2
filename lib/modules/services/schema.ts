import { z } from "zod";
import { imageSchema, positiveIntNoLeadingZero } from "@/lib/schema-utils";
// import { zfd } from "zod-form-data";

export const addServiceSchema = z.object({
  name: z.string().min(1, "Service name is required"),
  description: z.string().min(1, "Service description is required"),
  price: positiveIntNoLeadingZero,
  image: imageSchema,
  maxWeight: z.optional(z.nullable(positiveIntNoLeadingZero)),
  isCustomerOrderable: z.boolean().default(false),
});

export type AddServiceSchema = z.infer<typeof addServiceSchema>;

export const deleteServiceSchema = z.object({
  id: z.string(),
});

export const updateServiceSchema = z.object({
  id: z.string().min(1, "services.id.required"),
  name: z.string().min(1, "services.name.required"),
  description: z.string().min(1, "services.description.required"),
  price: positiveIntNoLeadingZero,
  maxWeight: z.optional(z.nullable(positiveIntNoLeadingZero)),
  isCustomerOrderable: z.boolean().default(false),
});

export type UpdateServiceSchema = z.infer<typeof updateServiceSchema>;

export const updateServiceImageSchema = z.object({
  id: z
    .string({
      error: "services.id.required",
    })
    .min(1, { error: "services.id.required" }),
  image: imageSchema,
});

export type UpdateServiceImageSchema = z.infer<typeof updateServiceImageSchema>;
