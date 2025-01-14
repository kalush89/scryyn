import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as z from "zod";
import { Role } from "@prisma/client";

//Define a schema for input validation
const userSchema = z
.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    phone: z.string().min(1, 'Phone is required').max(100),
    password: z.string()
    .min(1, 'Password is required')
    .min(8, 'Password must have atleast 8 characters'),
    role: z.nativeEnum(Role, { errorMap: () => ({ message: "Invalid role" }) }),
})

export async function POST(req: Request){
    try {
        const body = await req.json();
        const { email, phone, password, role } = userSchema.parse(body);

        //check if email exists
        const existingUserByEmail = await db.user.findUnique({
            where: { email: email }
        });

        if(existingUserByEmail) {
            return NextResponse.json(
                { user: null, message: "User with this email already exists"},
                { status: 409 }
            )
        }

        //check if phone exists
        const existingUserByPhone = await db.user.findUnique({
            where: { phone: phone }
        });

        if(existingUserByPhone) {
            return NextResponse.json(
                { user: null, message: "User with this phone already exists"},
                { status: 409 }
            )
        }

        //save new user
        const hashPassword = await hash(password, 10);
        const newUser = await db.user.create({
            data: {
                email,
                phone,
                password: hashPassword,
                role
            }
        });

        //Not secure to send back the password
        const { password: newUserPassword, ...rest } = newUser;

        return NextResponse.json(
            { user: rest, message: "User created successfully" }, 
            { status: 201 }
        );
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
    
}