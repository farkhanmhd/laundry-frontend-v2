import { z } from "zod";
import { positiveIntNoLeadingZero } from "@/lib/schema-utils";

export const addMemberSchema = z.object({
  name: z.string().min(3, "Customer name is required"),
  phone: positiveIntNoLeadingZero.transform((val) => String(val)),
});

export type AddMemberSchema = z.infer<typeof addMemberSchema>;
