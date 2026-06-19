import { z } from "zod";

export const assetSchema = z.object({
  id: z.optional(z.string()),
  name: z.string().min(1, "assets.name.required"),
  licensePlate: z.string().min(1, "assets.licensePlate.required"),
});

export type AssetSchema = z.infer<typeof assetSchema>;
