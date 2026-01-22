import { z } from "zod";

export const updateRoleSchema = z.object({
  userId: z.string(),
  role: z.union([z.literal("admin"), z.literal("user")]),
});

export type UpdateRoleSchema = z.Infer<typeof updateRoleSchema>;
