import { z } from "zod";

export const userSchema = z.object({
  account_id: z.string().min(1, "Account ID is required"),
  created_at: z.string().min(1, "Created at is required"),
  email: z.string().min(1, "Email is required"),
  first_name: z.string().min(1, "First name is required"),
  id: z.string().min(1, "ID is required"),
  last_name: z.string().min(1, "Last name is required"),
  type: z.enum(["owner", "admin", "member"]),
});

export type UserFormData = z.infer<typeof userSchema>;
