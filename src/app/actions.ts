'use server';

import { signIn, signOut, getSession } from 'next-auth/react';
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';



// Function to handle user logout
export const logout = async () => {
  try {
    await signOut({ callbackUrl: "/" }); // Sign out the user and redirect to the home page
    revalidatePath("/"); // Revalidate the cache for the home path
  } catch (error) {
    console.error('Logout error:', error);
    throw new Error('Failed to logout.');
  }
};

