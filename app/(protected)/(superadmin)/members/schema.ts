import { z } from "zod";

export const addMemberSchema = z.object({
  name: z.string().min(3, "Customer name is required"),
  phone: z.string().min(7, "Phone number is required"),
});

export type AddMemberSchema = z.infer<typeof addMemberSchema>;
