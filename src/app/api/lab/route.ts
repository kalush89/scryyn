import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import * as z from "zod";
import { hash } from "bcrypt";
import userValSchema from "@/utils/validateUser";

// Validation schema for labs
const labSchema = z.object({
    labName: z.string().nonempty("Lab name is required"),
    referralFee: z.number().min(1, "Referral fee you wish to give a doctor is required"),
    registrationNumber: z.string().nonempty("Lab registration number is required"),

});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { labName, referralFee, registrationNumber } =
            labSchema.parse(body);
        const { email, phone, password, address } =
            userValSchema.parse(body);

        // Check if email already exists
        const existingLab = await db.user.findUnique({ 
            where: { email } 
        });

        if (existingLab) {
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

        // Create the lab user
        const newLab = await db.user.create({
            data: {
                email,
                phone,
                password: hashedPassword,
                address,
                role: "LAB",
                lab: {
                    create: {
                        name: labName,
                        referralFee,
                        registrationNumber,
                    },
                },
            },
        });

        //Not secure to send back the password
        const { password: newUserPassword, ...rest } = newLab;

        return NextResponse.json(
            { message: "Lab registered successfully", user: rest },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}