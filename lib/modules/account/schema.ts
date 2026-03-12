import { z } from "zod";

export const updateProfileSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email().min(3, "Email must be at least 3 characters"),
  phone: z.string().min(8, "Phone number must be at least 8 characters"),
});

export const updateAdminSchema = updateProfileSchema.extend({
  email: z.email().min(3, "Email must be at least 3 characters"),
});

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
export type UpdateAdminSchema = z.infer<typeof updateAdminSchema>;

export const addressSchema = z.object({
  id: z.string(),
  label: z
    .string()
    .min(3, "Label must be at least 3 characters")
    .max(255, "Label must be at most 255 characters"),
  street: z
    .string()
    .min(3, "Address must be at least 5 characters")
    .max(255, "Address must be at most 255 characters"),
  note: z.string().max(255, "Note must be at most 255 characters").nullable(),
  // Validation: value must not be 0
  lat: z
    .number()
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90")
    .refine((val) => val !== 0, "Please pin a location on the map"),
  lng: z
    .number()
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180")
    .refine((val) => val !== 0, "Please pin a location on the map"),
});

export type AddressSchema = z.infer<typeof addressSchema>;

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type UpdatePasswordSchema = Omit<
  z.infer<typeof updatePasswordSchema>,
  "confirmPassword"
>;

export const updateAddressSchema = z.object({
  label: z
    .string()
    .min(3, "Label must be between 3 and 255 characters")
    .max(255, "Label must be between 3 and 255 characters")
    .optional(),
  street: z
    .string()
    .min(3, "Street must be between 3 and 255 characters")
    .max(255, "Street must be between 3 and 255 characters")
    .optional(),
  lat: z
    .number()
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90")
    .optional(),
  lng: z
    .number()
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180")
    .optional(),
  note: z.string().max(255, "Note must be at most 255 characters").optional(),
});

export type UpdateAddressSchema = z.infer<typeof updateAddressSchema>;
