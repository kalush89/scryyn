import NextAuth from "next-auth";
import type { JWT } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcryptjs from "bcryptjs";
import { z } from 'zod';

import { User } from '@prisma/client'; // Prisma auto-generates this

// Function to fetch a user by email from the database
async function getUser(email: string): Promise<User | undefined> {
  
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) return undefined;
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

// NextAuth configuration
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma), // Use Prisma adapter for database operations

  providers: [
    // Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // Custom Credentials Provider
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        // Validate credentials using zod
        const parsedCredentials = z
          .object({
            email: z.string({ required_error: "Enter an email address" }).email(),
            password: z.string({ required_error: "Enter a password" }).min(6)
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          return null; // Validation failed
        }
        const { email, password } = parsedCredentials.data;
        // Fetch user from the database using the provided email
        
        const user = await getUser(email);
        if (!user) {
          return null;
        }


        // Compare provided password with stored hashed password
        const passwordsMatch = await bcryptjs.compare(password, user.password!);

        if (!passwordsMatch) {
          return null; // Invalid password
        }
        // Return user object if credentials are valid
        return {
          id: user.id,
          email: user.email,
          phone: user.phone,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role, // assuming role exists in your User model
          avatarURL: user.avatarURL,
        };





      },
    }),
  ],

  session: {
    strategy: "jwt", // Use JWT for session management
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },

  jwt: {
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },

  callbacks: {
    // Callback to handle JWT
    async jwt({ token, user, account }) {
      const ExtendedUser = user as User;
      // Runs at login or whenever the JWT is updated
      if (ExtendedUser && account) {
        token.id = user.id;
        token.email = user.email;
        token.phone = ExtendedUser.phone;
        token.firstName = ExtendedUser.firstName;
        token.lastName = ExtendedUser.lastName;
        token.role = ExtendedUser.role;
        token.avatarURL = ExtendedUser.avatarURL;
      } else if (token.email) {
        // Fetch the user details from the database for existing OAuth users
        // This is useful for Google sign-in where user details are not passed in the JWT
        // but we still want to fetch the user from the database
        // to get the role and other details
        // Fetch the user from the database using the email in the token
        const dbUser = await getUser(token.email);

        if (dbUser) {
          token.id = dbUser.id;
          token.phone = dbUser.phone;
          token.name = dbUser.firstName;
          token.lastName = dbUser.lastName;
          token.email = dbUser.email;
          token.role = dbUser.role;
          token.avatarURL = dbUser.avatarURL;
        }
      }
      // Decrypting JWT to check if expired
      if (typeof token.idToken === 'string') {
        const tokenParsed = JSON.parse(Buffer.from(token.idToken.split('.')[1], 'base64').toString());
        const dateNowInSeconds = new Date().getTime() / 1000;
        if (dateNowInSeconds > tokenParsed.exp) {
          // Token is expired, prompt re-authentication
          throw new Error("expired token");
        }
      }
      if (process.env.NODE_ENV === "development") {
        console.log("token : ", token);
      }
      return token;
    },

    // Callback to handle session
    async session({ session, token }) {
      // Use type assertion to ensure TypeScript recognizes the custom properties on token
      const customToken = token as unknown as JWT;  // Explicitly assert `token` as JWT with custom properties
      if (session.user) {
        session.user.id = customToken.id;
        session.user.firstName = customToken.firstName;
        session.user.lastName = customToken.lastName;
        session.user.phone = customToken.phone;
        session.user.email = customToken.email;
        session.user.role = customToken.role;
        session.user.avatarURL = customToken.avatarURL;
      } else if (token.email) {
        // Fetch the user details from the database for existing OAuth users
        const dbUser = await getUser(token.email);
        if (dbUser) {
          token.id = dbUser.id;
          token.firstName = dbUser.firstName;
          token.lastName = dbUser.lastName;
          token.phone = dbUser.phone;
          token.email = dbUser.email;
          token.role = dbUser.role;
          token.avatarURL = dbUser.avatarURL;
        }
      }
      if (process.env.NODE_ENV === "development") {
        console.log("session : ", session);
      }
      return session;
    },


    async signIn({ account, profile }) {
      // Check if the account is from Google or Facebook
      if (account?.provider !== "google" && account?.provider !== "facebook") {
        return true; // Allow sign-in for other providers
      }
      // Check if the profile contains the required fields 
      if (!profile?.email || !profile?.given_name || !profile?.family_name) {
        return false; // Reject sign-in if required fields are missing
      }
      // Check if the account is already linked to a user
      const existingAccount = await prisma.account.findFirst({
        where: {
          provider: account?.provider!,
          providerAccountId: account?.providerAccountId!,
        },
      });
      if (existingAccount) {
        // Account already linked to a user, allow sign-in
        return true;
      }
      // Check if the user exists in the database
      const user = await getUser(profile?.email!);
      if (user) {
        // User exists, return true to allow sign-in
        return true;
      }
      // User doesn't exist, create a new user in the database
      const newUser = await prisma.user.create({
        data: {
          firstName: profile?.given_name!,
          lastName: profile?.family_name!,
          phone: profile?.phone as string,
          email: profile?.email!,
          avatarURL: profile?.picture as string,
          role: "PATIENT",
          emailVerified: new Date(),
        },
      });
      // Create a new account for the user
       await prisma.account.create({
        data: {
          user: { connect: { id: newUser.id } },
          //userId: newUser?.id, // This is not needed if you are using the Prisma adapter
          provider: account?.provider!,
          type: account?.type!,
          providerAccountId: account?.providerAccountId!,
          access_token: account?.access_token,
          refresh_token: account?.refresh_token,
          expires_at: account?.expires_at,
          token_type: account?.token_type,
          scope: account?.scope,
          id_token: account?.id_token,
        },
      });
      // Create a new patient record for the user
      await prisma.patient.create({
        data: {
          user: { connect: { id: newUser.id } },
          dateOfBirth: profile?.birthdate,
          gender: profile?.gender,
        },

      });
      // Return true to allow sign-in
      if (process.env.NODE_ENV === "development") {
        console.log("New user created:", newUser);
      }

      return true;
    },

  },



  pages: {
    signIn: "/app/login", // Custom sign-in page
    error: "/app/error", // Custom error page
  },

  debug: process.env.NODE_ENV === "development", // Helpful during dev
});

// Extend the JWT interface to include custom fields
declare module "next-auth" {
  interface JWT {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    role?: string;
    avatarURL?: string;
  }
  // Extend the Session interface to include custom fields in the user object
  interface Session {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      phone: string;
      email: string;
      role?: string;
      avatarURL?: string;
    };
  }
}

