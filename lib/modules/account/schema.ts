import { z } from "zod";
import { positiveIntNoLeadingZero } from "@/lib/schema-utils";

export const updateProfileSchema = z.object({
  username: z.string().min(3, "account.username.min"),
  name: z.string().min(2, "account.name.min"),
  phone: positiveIntNoLeadingZero,
});

export const updateAdminSchema = updateProfileSchema.extend({
  email: z.email().min(3, "account.email.min"),
});

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
export type UpdateAdminSchema = z.infer<typeof updateAdminSchema>;

export const addressSchema = z.object({
  id: z.string(),
  label: z
    .string()
    .min(3, "account.label.min")
    .max(255, "account.label.max"),
  street: z
    .string()
    .min(3, "account.street.min")
    .max(255, "account.street.max"),
  note: z.string().max(255, "account.note.max").nullable(),
  lat: z
    .number()
    .min(-90, "account.lat.range")
    .max(90, "account.lat.range")
    .refine((val) => val !== 0, "account.lat.pinRequired"),
  lng: z
    .number()
    .min(-180, "account.lng.range")
    .max(180, "account.lng.range")
    .refine((val) => val !== 0, "account.lng.pinRequired"),
});

export type AddressSchema = z.infer<typeof addressSchema>;

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "account.currentPassword.required"),
    newPassword: z.string().min(8, "account.newPassword.min"),
    confirmPassword: z.string().min(1, "account.confirmPassword.required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "account.confirmPassword.mustMatch",
    path: ["confirmPassword"],
  });

export type UpdatePasswordSchema = Omit<
  z.infer<typeof updatePasswordSchema>,
  "confirmPassword"
>;

export const updateAddressSchema = z.object({
  label: z
    .string()
    .min(3, "account.labelOptional.min")
    .max(255, "account.labelOptional.max")
    .optional(),
  street: z
    .string()
    .min(3, "account.streetOptional.min")
    .max(255, "account.streetOptional.max")
    .optional(),
  lat: z
    .number()
    .min(-90, "account.lat.range")
    .max(90, "account.lat.range")
    .optional(),
  lng: z
    .number()
    .min(-180, "account.lng.range")
    .max(180, "account.lng.range")
    .optional(),
  note: z.string().max(255, "account.note.max").optional(),
});

export const updateAddressSchemaWithId = updateAddressSchema.extend({
  id: z.string(),
});

export type UpdateAddressSchemaWithId = z.infer<
  typeof updateAddressSchemaWithId
>;
export type UpdateAddressSchema = z.infer<typeof updateAddressSchema>;
