import { z } from "zod";
import { positiveIntNoLeadingZero } from "@/lib/schema-utils";

export const updateProfileSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: positiveIntNoLeadingZero,
});

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;

export const addressSchema = z.object({
  label: z.string().min(2, "Label must be at least 2 characters"),
  street: z.string().min(5, "Address must be at least 5 characters"),
  // Validation: value must not be 0
  lat: z
    .number()
    .refine((val) => val !== 0, "Please pin a location on the map"),
  lng: z
    .number()
    .refine((val) => val !== 0, "Please pin a location on the map"),
});

export type AddressSchema = z.infer<typeof addressSchema>;
