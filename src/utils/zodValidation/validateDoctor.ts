import * as z from "zod";

export const doctorSchema = z.object({
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
        .min(3, "First name must have at least 3 characters")
        .max(15, "First name must have at most 15 characters"),
    lastName: z
        .string()
        .min(3, "Last name must have at least 3 characters")
        .max(15, "Last name must be at most 15 characters"),
    specialization: z.string().nonempty("Specialization is required"),
    licenseNumber: z.string().nonempty("Medical license number is required"),
});

export type DoctorSchema = z.infer<typeof doctorSchema>;