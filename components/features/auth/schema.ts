import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, { error: "Username must be at least 3 characters long" }),
  password: z
    .string()
    .min(3, { error: "Password must be at least 3 characters long" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    phoneNumber: z
      .string()
      .min(7, "Phone number is too short")
      .max(20, "Phone number is too long")
      .regex(/^[1-9][0-9\s\-()]*$/, "Phone number cannot start with 0 or +"),
    name: z.string().min(2, "Name must be at least 2 characters"),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(32, "Username is too long")
      .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    memberId: z.optional(z.nullable(z.string())),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
