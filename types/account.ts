import { z } from "zod";

export const accountSchema = z.object({
  name: z.string().min(1, "Organization name is required"),
  slug: z.string().min(1, "Slug is required"),
  email: z.string().email("Must be a valid email").min(1, "Email is required"),
  logo: z.string().optional(),
});

export type AccountFormData = z.infer<typeof accountSchema>;
