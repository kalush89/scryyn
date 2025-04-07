import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcryptjs from 'bcryptjs';
import { patientSchema } from '@/lib/zod/validatePatient';
import { PatientRegistrationFormData } from '@/models/patient-reg';


export async function POST(req: NextRequest) {
    try {
      const body = await req.json();
      console.log("Request body:", body);
  
      // Validate the request body
      const parsed = patientSchema.safeParse(body);
  
      if (!parsed.success) {
        console.error("Validation failed:", parsed.error);
        return NextResponse.json(
          { error: "Validation failed." },
          { status: 400 }
        );
      }
  
      const { firstName, lastName, email, phone, password, dateOfBirth, gender } = parsed.data;
  
      // Check if Patient already exists
      const existingPatient = await prisma.user.findUnique({
        where: { email: email },
      });
  
      if (existingPatient) {
        return NextResponse.json(
          { error: "A patient with this email already exists." },
          { status: 400 }
        );
      }
  
      // Hash Patient Password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create User
    const newUser = await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        password: hashedPassword,
        role: "PATIENT",
      },
    });

    // Create Patient
    const newPatient = await prisma.patient.create({
      data: {
        id: newUser.id, // Use the User ID as the Patient ID
        dateOfBirth: new Date(dateOfBirth),
        gender: gender,
      },
    });

    // Create Account
    const newAccount = await prisma.account.create({
      data: {
        type: "credentials",
        provider: "credentials",
        providerAccountId: email,
        userId: newUser.id,
      },
    });
  
      return NextResponse.json(
        {
          message: "Patient has been registered successfully.",
          patientId: newPatient.id,
          patientUserId: newUser.id,
          accountId: newAccount.id,
        },
        { status: 201 }
      );
    } catch (error) {
      console.error("Error registering patient:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }