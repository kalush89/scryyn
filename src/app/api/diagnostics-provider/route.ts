import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcryptjs from 'bcryptjs';
import { diagnosticProviderRegistrationSchema } from '@/lib/zod/diagnosticProviderRegistration';
import { RegistrationFormData } from '@/models/diagnostics-provider-reg';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate combined payload
    const parsed = diagnosticProviderRegistrationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { errors: parsed.error.format() },
        { status: 400 }
      );
    }

    // Explicitly type parsed.data as RegistrationFormData
    const { diagnosticProvider, manager } = parsed.data as unknown as RegistrationFormData;

    // Check if Diagnostic Provider already exists
    const existingProvider = await prisma.diagnosticProvider.findUnique({
      where: { email: diagnosticProvider.email },
    });

    if (existingProvider) {
      return NextResponse.json(
        { error: 'Diagnostic provider with this email already exists.' },
        { status: 400 }
      );
    }

    // Check if Manager (User) already exists
    const existingManager = await prisma.user.findUnique({
      where: { email: manager.email },
    });

    if (existingManager) {
      return NextResponse.json(
        { error: 'User with this email already exists.' },
        { status: 400 }
      );
    }

    // Create Diagnostic Provider
    const newProvider = await prisma.diagnosticProvider.create({
      data: {
        name: diagnosticProvider.name,
        email: diagnosticProvider.email,
        phone: diagnosticProvider.phone,
        address: diagnosticProvider.address,
        latitude: diagnosticProvider.latitude,
        longitude: diagnosticProvider.longitude,
        city: diagnosticProvider.city,
        state: diagnosticProvider.state,
        rcNumber: diagnosticProvider.rcNumber,
        // rrbnLicenseNumber: diagnosticProvider.rrbnLicenseNumber,
        // mlscnLicenseNumber: diagnosticProvider.mlscnLicenseNumber,
        // bankAccountNumber: diagnosticProvider.bankAccountNumber,
        // bankName: diagnosticProvider.bankName,
        // paymentMethod: diagnosticProvider.paymentMethod,
      },
    });

    // Hash Manager Password
    const hashedPassword = await bcryptjs.hash(manager.password, 10);

    // Create Manager User
    const newUser = await prisma.user.create({
      data: {
        email: manager.email,
        password: hashedPassword,
        firstName: manager.firstName,
        lastName: manager.lastName,
        phone: manager.phone,
        // avatarURL: manager.avatarURL,
        role: 'DP_MANAGER',
        diagnosticProviderStaff: {
          create: {
            dpId: newProvider.id,
            // identificationType: staffInfo.identificationType,
            // identificationNumber: staffInfo.identificationNumber,
          },
        },
      },
    });

    // Create Account for Manager
    const newAccount = await prisma.account.create({
      data: {
        type: 'credentials', // Assuming credentials-based authentication
        provider: 'credentials', // Authentication provider
        providerAccountId: manager.email, // Typically the email
        userId: newUser.id, // Link to the manager user
      },
    });

    return NextResponse.json(
      {
        message: 'Diagnostic provider registered successfully.',
        providerId: newProvider.id,
        managerUserId: newUser.id,
        accountId: newAccount.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error registering diagnostic provider:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}