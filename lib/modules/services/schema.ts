import { z } from "zod";
import { imageSchema, positiveIntNoLeadingZero } from "@/lib/schema-utils";
// import { zfd } from "zod-form-data";

export const addServiceSchema = z.object({
  name: z.string().min(1, "Service name is required"),
  description: z.string().min(1, "Service description is required"),
  price: positiveIntNoLeadingZero,
  image: imageSchema,
});

export type AddServiceSchema = z.infer<typeof addServiceSchema>;

export const deleteServiceSchema = z.object({
  id: z.string(),
});

export const updateServiceSchema = z.object({
  id: z.string().min(1, "Service id is required"),
  name: z.string().min(1, "Service name is required"),
  description: z.string().min(1, "Service description is required"),
  price: positiveIntNoLeadingZero,
});

export type UpdateServiceSchema = z.infer<typeof updateServiceSchema>;

export const updateServiceImageSchema = z.object({
  id: z
    .string({
      error: "Service ID is required.",
    })
    .min(1, { error: "Service ID cannot be empty." }),
  image: imageSchema,
});

export type UpdateServiceImageSchema = z.infer<typeof updateServiceImageSchema>;
