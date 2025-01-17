import * as z from "zod";

const userValSchema = z.object({
    email: z
        .string()
        .email("Invalid email")
        .min(3, "Email must be atleast 3 characters long")
        .max(255, "Email must be at most 255 characters long"),
    phone: z
        .string()
        .nonempty("Phone number is required")
        .max(20, "Phone number must be at most 20 characters long"),
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
});

export default userValSchema;