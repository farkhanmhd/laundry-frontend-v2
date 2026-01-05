import { z } from "zod";
import { positiveIntNoLeadingZero } from "@/lib/schema-utils";

export const updateProfileSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: positiveIntNoLeadingZero,
});

export const updateAdminSchema = updateProfileSchema.extend({
  email: z.email().min(3, "Email must be at least 3 characters"),
});

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
export type UpdateAdminSchema = z.infer<typeof updateAdminSchema>;

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

export const updatePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;
