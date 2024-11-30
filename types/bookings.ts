import { z } from "zod";

export const BookingSchema = z.object({
  facilityId: z.string().min(1, "Facility is required"),
  spaceId: z.string().min(1, "Space is required"),
  date: z.date({
    required_error: "Date is required",
    invalid_type_error: "That's not a valid date",
  }),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  numberOfPeople: z
    .number()
    .int()
    .positive("Number of people must be positive"),
  purpose: z.string().min(1, "Purpose is required"),
  additionalNotes: z.string().optional(),
});

export type BookingFormData = z.infer<typeof BookingSchema>;
