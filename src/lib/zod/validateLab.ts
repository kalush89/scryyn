import * as z from "zod";
/*  id            String        @id @default(cuid())
  name          String
  email         String        @unique
  phone         String
  address       String
  latitude      Float         // Geo Location
  longitude     Float         // Geo Location
  verified      Boolean   */
// Validation schema for labs
export const labSchema = z.object({
    email: z
        .string()
        .email("Invalid email")
        .min(3, "Email must have atleast 3 characters")
        .max(255, "Email must have at most 255 characters"),
    phone: z
        .string()
        .nonempty("Phone number is required")
        .max(20, "Phone number must have at most 20 characters"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/\d/, "Password must contain at least one number")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
    address: z
        .string()
        .max(255, "Address must be at most 255 characters long")
        .optional(),
    labName: z
        .string()
        .min(4, "Lab name must be atleast 4 characters long."),
    adminFirstName: z
        .string()
        .min(3, "First name must have at least 3 characters")
        .max(15, "First name must be at most 15 characters"),
    adminLastName: z
        .string()
        .min(3, "First name must have at least 3 characters")
        .max(15, "First name must be at most 15 characters"),
    referralFee: z
        .coerce
        .number()
        .positive()
        .min(1, "Referral commision must not be less than 1% of test fee"),
    registrationNumber: z
        .string()
        .nonempty("Lab registration number is required"),

});

export type LabSchema = z.infer<typeof labSchema>;