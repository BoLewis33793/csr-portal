import { z } from "zod";

export const personalInfoSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone_number: z.string().min(10, "Phone number is too short"),
  date_of_birth: z.string(),
  gender: z.string(),
});

export const addressSchema = z.object({
  street_address: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postal_code: z.string().min(4, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
});