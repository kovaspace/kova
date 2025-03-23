import { z } from "zod";

export const CustomerSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("That's not a valid email"),
  phone_number: z.string().min(1, "Phone number is required"),
});

export type CustomerFormData = z.infer<typeof CustomerSchema>;
