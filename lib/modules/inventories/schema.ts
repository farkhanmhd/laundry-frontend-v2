import { z } from "zod";
import type { SelectOption } from "@/components/forms/form-select";
import {
  imageSchema,
  nonZeroIntegerSchema,
  positiveIntNoLeadingZero,
} from "@/lib/schema-utils";

export const units: SelectOption[] = [
  {
    label: "Pieces",
    value: "pieces",
  },
  {
    label: "Kilogram",
    value: "kilogram",
  },
  {
    label: "gram",
    value: "gram",
  },
  {
    label: "litre",
    value: "litre",
  },
  {
    label: "milliliter",
    value: "milliliter",
  },
];

const unitEnum = z.enum(["kilogram", "gram", "litre", "milliliter", "pieces"], {
  error: "Invalid option",
});

export const addInventorySchema = z.object({
  name: z.string().min(1, "Inventory name is required"),
  image: imageSchema,
  description: z.string().min(1, "Inventory name is required"),
  price: positiveIntNoLeadingZero,
  unit: unitEnum,
  stock: positiveIntNoLeadingZero,
  safetyStock: positiveIntNoLeadingZero,
});

export type AddInventorySchema = z.infer<typeof addInventorySchema>;

export const deleteInventorySchema = z.object({
  id: z.string(),
});

export const updateInventorySchema = z.object({
  id: z.string().min(1, "Inventory id cannot be empty"),
  name: z.string().min(1, "Inventory name cannot be empty"),
  description: z.string().min(1, "Inventory description is required"),
  unit: unitEnum,
  price: positiveIntNoLeadingZero,
  safetyStock: positiveIntNoLeadingZero,
});

export const updateInventoryBodySchema = updateInventorySchema.omit({
  id: true,
});
export type UpdateInventorySchema = z.infer<typeof updateInventorySchema>;
export type UpdateInventoryBodySchema = z.infer<
  typeof updateInventoryBodySchema
>;

export const allowedAdjustType = ["adjustment", "waste", "restock"] as const;

export const adjustQuantitySchema = z
  .object({
    id: z
      .string({
        error: "Inventory ID is required.",
      })
      .min(1, { error: "Inventory ID cannot be empty." }),
    currentQuantity: z.int(),
    changeAmount: nonZeroIntegerSchema,
    type: z.union(allowedAdjustType.map((val) => z.literal(val))),
    note: z
      .string({
        error: "A reason for the adjustment is required.",
      })
      .min(5, { error: "Please provide a reason (at least 5 characters)." })
      .max(500, { error: "The reason must be 500 characters or less." }),
  })
  .refine((data) => data.changeAmount !== data.currentQuantity, {
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
