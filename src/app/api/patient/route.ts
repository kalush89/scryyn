import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as z from "zod";
import userValSchema from "@/utils/validateUser";

// Validation schema for individuals
const patientSchema = z.object({
   
    firstname: z
        .string()
        .min(3, "First name must have at least 3 characters long")
        .max(15, "First name must be at most 15 characters long"),
    lastname: z
        .string()
        .min(3, "First name must have at least 3 characters long")
        .max(15, "First name must be at most 15 characters long"),
    sex: z
        .string()
        .nonempty("The sex field is required"),
    dateOfBirth: z
        .string()
        .nonempty("Date of birth is required")
        .regex(/^\d{4}-\d{2}-\d{2}$/,"Invalid format. Date of birth must be in the format YYYY-MM-DD.")
        .refine((dob) => {
            const parsedDate = new Date(dob);
            return !isNaN(parsedDate.getTime()); // Check if the date is valid
          }, "Invalid date value")
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { firstname, lastname, sex, dateOfBirth } = patientSchema.parse(body);
        const { email, phone, password, address } = userValSchema.parse(body);

        // Check if email already exists
        const existingUser = await db.user.findUnique({ 
            where: { email } 
        });

        if (existingUser) {
            return NextResponse.json(
                { message: "User with this email already exists" },
                { status: 409 }
            );
        }

        //check if phone exists
        const existingUserByPhone = await db.user.findUnique({
            where: { phone }
        });

        if (existingUserByPhone) {
            return NextResponse.json(
                { user: null, message: "User with this phone already exists" },
                { status: 409 }
            )
        }

        // Hash the password
        const hashedPassword = await hash(password, 10);

        // Create the individual user
        const newPatient = await db.user.create({
            data: {
                email,
                phone,
                password: hashedPassword,
                address,
                role: "PATIENT",
                accountStatus: "ACTIVE",
                patient: {
                    create: {
                        name: `${firstname} ${lastname}`,
                        sex,
                        dateOfBirth,
                    },
                },
            },
        });

        //Not secure to send back the password
        const { password: newUserPassword, ...rest } = newPatient;

        return NextResponse.json(
            { message: "Patient registered successfully", user: rest },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}