import { z } from "zod";

export const facilitiesSchema = z.object({
  name: z.string().min(1, "First name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  country: z.tuple([
    z.string().min(1, "Country is required"),
    z.string().optional(),
  ]),
  email: z.string().min(1, "Email is required"),
  phone_number: z.string().min(1, "Phone number is required"),
  images: z.string().optional(),
  description: z.string().min(1, "Description is required"),
});

export type FacilityFormData = z.infer<typeof facilitiesSchema>;
