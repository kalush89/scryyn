import { z } from 'zod';

export const diagnosticProviderSchema = z.object({
  name: z.string().min(3, "Diagnostics provider name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(15, "Phone number must be at most 15 digits"),
  address: z.string().min(5, "Address is required"),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  rcNumber: z.string().min(4, "RC Number is required"),
  // rrbnLicenseNumber: z.string().optional(),
  // mlscnLicenseNumber: z.string().optional(),
  
});