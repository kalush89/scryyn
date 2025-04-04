import { z } from "zod";
// Validation schema for individuals
export const patientSchema = z.object({
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
    firstName: z
        .string()
        .min(3, "First name must have at least 3 characters long")
        .max(15, "First name must be at most 15 characters long"),
    lastName: z
        .string()
        .min(3, "First name must have at least 3 characters long")
        .max(15, "First name must be at most 15 characters long"),
    sex: z
        .string()
        .nonempty("The sex field is required"),
    dateOfBirth: z
        .string()
        .refine((dob) => {
            const parsedDate = new Date(dob);
            return !isNaN(parsedDate.getTime()); // Check if the date is valid
          }, "Invalid date value")
});
