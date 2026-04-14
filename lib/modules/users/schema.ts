import { z } from "zod";

export const updateRoleSchema = z.object({
  userId: z.string(),
  role: z.union([z.literal("admin"), z.literal("user")]),
});

export const createCashierSchema = z.object({
  phoneNumber: z
    .string()
    .min(7, "Invalid phone number format")
    .max(20, "Invalid phone number format")
    .regex(/^\+?[0-9\s\-()]+$/, "Invalid phone number format"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  username: z
    .string()
    .min(3, "Only letters, numbers, and underscores")
    .max(32, "Only letters, numbers, and underscores")
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores"),
  email: z.string().email("Invalid email address"),
});

export type UpdateRoleSchema = z.infer<typeof updateRoleSchema>;
export type CreateCashierSchema = z.infer<typeof createCashierSchema>;
