import { z } from "zod";
import { imageSchema, positiveIntNoLeadingZero } from "@/lib/schema-utils";

export const addProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Product name is required"),
  image: imageSchema,
  price: positiveIntNoLeadingZero,
  currentQuantity: positiveIntNoLeadingZero,
  reorderPoint: positiveIntNoLeadingZero,
});

export type AddProductSchema = z.infer<typeof addProductSchema>;

export const deleteProductSchema = z.object({
  id: z.string(),
});

export const updateProductSchema = z.object({
  id: z.string().min(1, "Product id cannot be empty"),
  name: z.string().min(1, "Product name cannot be empty"),
  description: z.string().min(1, "Product description is required"),
  price: positiveIntNoLeadingZero,
  reorderPoint: positiveIntNoLeadingZero,
});

export const updateProductBodySchema = updateProductSchema.omit({ id: true });
export type UpdateProductSchema = z.infer<typeof updateProductSchema>;
export type UpdateProductBodySchema = z.infer<typeof updateProductBodySchema>;

export const adjustQuantitySchema = z
  .object({
    id: z
      .string({
        error: "Product ID is required.",
      })
      .min(1, { message: "Product ID cannot be empty." }),
    currentQuantity: positiveIntNoLeadingZero,
    newQuantity: positiveIntNoLeadingZero,
    reason: z
      .string({
        error: "A reason for the adjustment is required.",
      })
      .min(5, { message: "Please provide a reason (at least 5 characters)." })
      .max(500, { message: "The reason must be 500 characters or less." }),
  })
  .refine((data) => data.newQuantity !== data.currentQuantity, {
    message: "New quantity must be different from the current quantity.",
    path: ["newQuantity"], // Where to display this error
  });

export type AdjustQuantitySchema = z.infer<typeof adjustQuantitySchema>;

export const updateProductImageSchema = z.object({
  id: z
    .string({
      error: "Product ID is required.",
    })
    .min(1, { message: "Product ID cannot be empty." }),
  image: imageSchema,
});

export type UpdateProductImageSchema = z.infer<typeof updateProductImageSchema>;
