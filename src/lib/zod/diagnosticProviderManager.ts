import { z } from 'zod';

export const diagnosticProviderManagerSchema = z.object({
  email: z.string().email("Email is required"),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/\d/, "Password must contain at least one number")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
      
      firstName: z
        .string()
        .min(3, "First name must have at least 3 characters")
        .max(15, "First name must be at most 15 characters"),
      
      lastName: z
        .string()
        .min(3, "Last name must have at least 3 characters")
        .max(15, "Last name must be at most 15 characters"),
      
      phone: z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number must be at most 15 digits")
        .optional(),
    
      // avatarURL: z.string().url("Invalid avatar URL").optional(),

      // identificationType: z.string().optional(),
      // identificationNumber: z.string().optional(),
  });