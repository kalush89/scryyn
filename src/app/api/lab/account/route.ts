import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { labSchema } from "@/utils/zodValidation/validateLab";
import { ZodError } from "zod";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parsedBody = labSchema.parse(body);

        const {
            adminFirstName,
            adminLastName,
            email,
            phone,
            password,
            address,
            labName,
            referralFee,
            registrationNumber,
        } = parsedBody;

        // Check if email already exists
        const existingLab = await db.user.findUnique({
            where: { email },
        });

        if (existingLab) {
            return NextResponse.json(
                { message: "User with this email already exists" },
                { status: 409 }
            );
        }

        // Check if phone already exists
        const existingUserByPhone = await db.user.findUnique({
            where: { phone },
        });

        if (existingUserByPhone) {
            return NextResponse.json(
                { message: "User with this phone already exists" },
                { status: 409 }
            );
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
                role: "LAB_ADMIN",
                accountStatus:"ACTIVE",
                labAdmin: {
                    create: {
                        name: `${adminFirstName} ${adminLastName}`,
                        lab: {
                            create: {
                                name: labName,
                                referralFee: referralFee,
                                registrationNumber,
                            },
                        },
                    },
                },
            },
        });

        // Exclude password from response
        const { password: newUserPassword, ...rest } = newLab;

        return NextResponse.json(
            { message: "Lab registered successfully", user: rest },
            { status: 201 }
        );
    } catch (error: unknown) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                {
                    error: "Validation failed",
                    details: error.errors.map((e) => ({
                        path: e.path,
                        message: e.message,
                    })),
                },
                { status: 400 }
            );
        }

        console.error("Internal server error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
