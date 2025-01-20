import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { patientSchema } from "@/utils/zodValidation/validatePatient";



export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, phone, password, address, firstname, lastname, sex, dateOfBirth } = patientSchema.parse(body);

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