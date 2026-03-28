import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1),
  username: z.string().min(1),
  email: z.string().email(),
  phoneNumber: z.string().min(1),
});

export type CreateUserSchema = z.Infer<typeof createUserSchema>;
