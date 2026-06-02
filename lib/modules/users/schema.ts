import { z } from "zod";

export const updateRoleSchema = z.object({
  userId: z.string(),
  role: z.enum(["superadmin", "admin", "driver", "user"]),
});

export const createCashierSchema = z.object({
  phoneNumber: z
    .string()
    .min(7, "users.phoneNumber.format")
    .max(20, "users.phoneNumber.format")
    .regex(/^\+?[0-9\s\-()]+$/, "users.phoneNumber.format"),
  name: z.string().min(2, "users.name.min"),
  username: z
    .string()
    .min(3, "users.username.regex")
    .max(32, "users.username.regex")
    .regex(/^[a-zA-Z0-9_]+$/, "users.username.regex"),
  email: z.string().email("users.email.invalid"),
});

export type UpdateRoleSchema = z.infer<typeof updateRoleSchema>;
export type CreateCashierSchema = z.infer<typeof createCashierSchema>;
