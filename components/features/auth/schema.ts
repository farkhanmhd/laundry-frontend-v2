import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(3, { error: "auth.username.min" }),
  password: z.string().min(3, { error: "auth.password.min" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    phoneNumber: z
      .string()
      .min(7, "auth.phoneNumber.min")
      .max(20, "auth.phoneNumber.max")
      .regex(/^[1-9][0-9\s\-()]*$/, "auth.phoneNumber.regex"),
    name: z.string().min(2, "auth.name.min"),
    username: z
      .string()
      .min(3, "auth.username.min")
      .max(32, "auth.username.max")
      .regex(/^[a-zA-Z0-9_]+$/, "auth.username.regex"),
    email: z.email("auth.email.invalid"),
    password: z.string().min(8, "auth.password.min"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "auth.confirmPassword.mustMatch",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
