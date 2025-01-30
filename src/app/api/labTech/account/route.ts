import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { auth } from "@/auth";
import { labTechnicianSchema } from "@/utils/zodValidation/validateLabTechnician";
import { ZodError } from "zod";

export async function POST(req: Request) {
    try {

        const session = await auth();
        if (!session || session.user.role !== "LAB_ADMIN") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
        }

        const labId = session.user.labId;
        if (!labId) {
            return NextResponse.json({ message: "Lab ID is required" }, { status: 400 });
        }

        const body = await req.json();
        const parsedBody = labTechnicianSchema.parse(body);

        const {
            firstName,
            lastName,
            email,
            phone,
            password,
            address,
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
        const newLabTech = await db.user.create({
            data: {
                email,
                phone,
                password: hashedPassword,
                address,
                role: "LAB_TECHNICIAN",  // Ensure TypeScript recognizes this
                accountStatus: "ACTIVE",
                labTechnician: {
                    create: {
                        name: `${firstName} ${lastName}`,
                        lab: { connect: { id: labId } },
                    },
                },
            },
        });

        // Exclude password from response
        const { password: newUserPassword, ...rest } = newLabTech;

        return NextResponse.json(
            { message: "Lab technician registered successfully", user: rest },
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
