import { z } from "zod";

export const vehicleSchema = z.object({
  id: z.optional(z.string()),
  name: z.string().min(1, "vehicles.name.required"),
  licensePlate: z.string().min(1, "vehicles.licensePlate.required"),
  ownerId: z.optional(z.nullable(z.string())),
});

export type VehicleSchema = z.infer<typeof vehicleSchema>;
