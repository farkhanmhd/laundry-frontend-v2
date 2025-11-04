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
