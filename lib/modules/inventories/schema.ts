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

export const addInventorySchema = z.object({
  name: z.string().min(1, "inventories.name.required"),
  image: imageSchema,
  description: z.string().min(1, "inventories.description.required"),
  price: positiveIntNoLeadingZero,
  stock: positiveIntNoLeadingZero,
  safetyStock: positiveIntNoLeadingZero,
});

export type AddInventorySchema = z.infer<typeof addInventorySchema>;

export const deleteInventorySchema = z.object({
  id: z.string(),
});

export const updateInventorySchema = z.object({
  id: z.string().min(1, "inventories.id.required"),
  name: z.string().min(1, "inventories.name.required"),
  description: z.string().min(1, "inventories.description.required"),
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
        error: "inventories.id.required",
      })
      .min(1, { error: "inventories.id.required" }),
    currentQuantity: z.int(),
    changeAmount: nonZeroIntegerSchema,
    adjustmentTime: z.date({ error: "inventories.adjustmentTime.required" }),
    note: z
      .string({
        error: "inventories.note.min",
      })
      .min(5, { error: "inventories.note.min" })
      .max(500, { error: "inventories.note.max" }),
  })
  .refine((data) => data.changeAmount !== data.currentQuantity, {
    error: "inventories.changeAmount.different",
    path: ["newQuantity"],
  });

export type AdjustQuantitySchema = z.infer<typeof adjustQuantitySchema>;

export const restockInventorySchema = z.object({
  id: z
      .string({
        error: "inventories.id.required",
      })
      .min(1, { error: "inventories.id.required" }),
  currentQuantity: z.int(),
  supplier: z
    .string({ error: "inventories.supplier.required" })
    .min(1, { error: "inventories.supplier.required" }),
  restockQuantity: positiveIntNoLeadingZero,
  restockTime: z.date({ error: "inventories.restockTime.required" }),
  note: z
    .string()
    .max(255, { error: "inventories.restockNote.max" })
    .optional(),
});

export type RestockInventorySchema = z.infer<typeof restockInventorySchema>;

export const updateInventoryImageSchema = z.object({
  id: z
      .string({
        error: "inventories.id.required",
      })
      .min(1, { error: "inventories.id.required" }),
  image: imageSchema,
});

export type UpdateInventoryImageSchema = z.infer<
  typeof updateInventoryImageSchema
>;
