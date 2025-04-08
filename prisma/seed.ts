const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // 1. Hash the password
  const hashedPassword = await bcrypt.hash('ScryynAdminPass123', 10);

  // 2. Create SUPERADMIN user and related Admin record
  const user = await prisma.user.upsert({
    where: { email: 'superadmin@scryyn.com' },
    update: {},
    create: {
      email: 'superadmin@scryyn.com',
      password: hashedPassword,
      firstName: 'Super',
      lastName: 'Admin',
      role: 'SUPERADMIN',
      isActive: true,
      admin: {
        create: {},
      },
    },
  });

   // 2. Create the associated Account for the SUPERADMIN
   const account = await prisma.account.create({
    data: {
      type: 'oauth', // Or another type (e.g., 'email' if you're using email-based login)
      provider: 'scryyn', // Customize to your app's provider name
      providerAccountId: user.id, // Use the user ID here for linking
      userId: user.id, // Link to the user via `userId`
      access_token: 'sample_access_token', // Set these to actual values if needed
      refresh_token: 'sample_refresh_token',
      expires_at: 3600, // Example expiration time in seconds
      token_type: 'bearer', // Or another token type if applicable
      scope: 'read write', // Example scope
    },
  });

  console.log(`✅ SUPERADMIN seeded: ${user.email}`);
  console.log(`✅ Account seeded for SUPERADMIN: ${account.providerAccountId}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());