import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { doctorSchema } from "@/utils/zodValidation/validateDoctor";


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {  email, phone, password, address, firstName, lastName, specialization, licenseNumber } =
            doctorSchema.parse(body);
        

        // Check if email already exists
        const existingDoctor = await db.user.findUnique({ 
            where: { email } 
        });
        
        if (existingDoctor) {
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

        // Create the doctor user
        const newDoctor = await db.user.create({
            data: {
                email,
                phone,
                password: hashedPassword,
                address,
                role: "DOCTOR",
                doctor: {
                    create: {
                        name: `${firstName} ${lastName}`,
                        specialization,
                        licenseNumber,
                    },
                },
            },
        });

        //Not secure to send back the password
        const { password: newUserPassword, ...rest } = newDoctor;

        return NextResponse.json(
            { message: "Doctor registered successfully", user: rest },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}