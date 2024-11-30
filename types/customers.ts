import { z } from "zod";

export const CustomerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("That's not a valid email"),
});

export type CustomerFormData = z.infer<typeof CustomerSchema>;
