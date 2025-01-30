import NextAuth, { JWT, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInSchema } from "./utils/zodValidation/signIn";
import { db } from "./lib/db";
import bcrypt from "bcryptjs";
import { Role, AccountStatus } from "@prisma/client";

export interface ExtendedUser extends User {
  id: string;
  email: string;
  role: Role;
  phone: string;
  emailVerified: Date | null;
  address: string | null;
  accountStatus: AccountStatus;
  createdAt: Date;
  labId?: string; // Include labId for both Lab Admins and Lab Technicians
  name: string;
}

let labId: string | undefined;
let userName: string | undefined;

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: true,
  secret: process.env.NEXTHAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<ExtendedUser | null> {
        // Validate input using the Zod schema
        const { email, password } = await signInSchema.parseAsync(credentials);

        // Fetch the user from the database, including lab info for Lab Admins & Technicians
        const theUser = await db.user.findUnique({
          where: { email },
          include: {
            doctor: true,
            labTechnician: true, // Fetch labId if user is a Lab Technician
            labAdmin: true, // Fetch labId if user is a Lab Admin
            
          },
        });

        if (!theUser) {
          throw new Error("Invalid email or password");
        }

        // Verify the password
        const isPasswordValid = await bcrypt.compare(password, theUser.password);
        if (!isPasswordValid) {
          throw new Error("Invalid email or password");
        }

        // Extrac 
        
        if (theUser.role === "LAB_ADMIN") {
          labId = theUser.labAdmin?.id;
          userName = theUser.labAdmin?.name;
        } else if (theUser.role === "LAB_TECHNICIAN") {
          labId = theUser.labTechnician?.labId;
          userName = theUser.labTechnician?.name;
        } else if (theUser.role === "DOCTOR") {
          userName = theUser.doctor?.name;
        }

       // Exclude sensitive information from the user object
       const { password: _, ...userWithoutPassword } = theUser;

       return {
         ...userWithoutPassword,
         role: userWithoutPassword.role || "user",
         labId,
         name: userName, // Store full name
       } as ExtendedUser;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = userName;
        token.email = user.email;
        token.role = (user as ExtendedUser).role;
        token.labId = (user as ExtendedUser).labId; // Store labId in JWT
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name!;
        session.user.email = token.email!;
        session.user.role = token.role as string;
        session.user.labId = token.labId as string; // Add labId to session
      }
      return session;
    },
  },
});

declare module "next-auth" {
  interface JWT {
    name: string;
    email: string;
    role: string;
    labId?: string;
  }
  interface Session {
    user: {
      name: string; // Ensure full name is accessible in session
      email: string;
      role?: string;
      labId?: string;
    };
  }
}
