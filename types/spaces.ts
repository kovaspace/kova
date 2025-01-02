import { z } from "zod";

export const spaceSchema = z.object({
  name: z.string().min(1, "Space name is required"),
  hourly_rate: z.coerce.number().min(1, "Hourly rate is required"),
  description: z.string().min(1, "Description is required"),
  facility_id: z.string().min(1, "Facility is required"),
  status: z.enum(["active", "inactive", "archived"]),
});

export type SpaceFormData = z.infer<typeof spaceSchema>;
