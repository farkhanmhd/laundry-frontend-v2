import { imageSchema, positiveIntNoLeadingZero } from "@/lib/schema-utils";
import { z } from "zod";
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

// export const updateServiceSchema = zfd.formData({
//   id: zfd.text(z.string().min(1, "Service id is required")),
//   name: zfd.text(z.string().min(1, "Service name is required")),
//   price: zfd.numeric(z.number().min(1, "Price must be a positive number")),
//   image: zfd.file().optional(),
// });

// export type UpdateServiceSchema = z.infer<typeof updateServiceSchema>;
// export type UpdateServiceBody = Omit<UpdateServiceSchema, "id">;
