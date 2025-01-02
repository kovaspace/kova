import { z } from "zod";

export const BookingSchema = z.object({
  facility_id: z.string().min(1, "Facility is required"),
  space_id: z.string().min(1, "Space is required"),
  customer_id: z.string().min(1, "Customer is required"),
  date: z.date({
    required_error: "Date is required",
    invalid_type_error: "That's not a valid date",
  }),
  time: z.object({
    start: z.string().min(1, "Start time is required"),
    end: z.string().min(1, "End time is required"),
  }),
});

export type BookingFormData = z.infer<typeof BookingSchema>;
