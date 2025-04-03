'use server';

import { signIn, signOut, getSession } from 'next-auth/react';
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';

// Function to handle user login with a specified provider
export const login = async (provider: string) => {
  try {
    // Sign in with the specified provider
    const result = await signIn(provider, { redirect: false });

    if (result?.error) {
      throw new Error(result.error);
    }

    // Fetch the session to get the user's role
    const session = await getSession();
    if (!session || !session.user) {
      throw new Error('Failed to retrieve user session.');
    }

    // Determine the callback URL based on the user's role
    let callbackUrl = '';
    switch (session.user.role) {
      case 'SUPERADMIN':
        callbackUrl = '/dashboard/admin';
        break;
      case 'STAFF':
        callbackUrl = '/dashboard/admin';
        break;
      case 'SUPPORT':
        callbackUrl = '/dashboard/admin';
        break;
      case 'DP_MANAGER':
        callbackUrl = '/dashboard/diagnostics-provider';
        break;
      case 'DP_STAFF':
        callbackUrl = '/dashboard/diagnostics-provider';
        break;
      case 'PATIENT':
        callbackUrl = '/dashboard/patient';
        break;
    }

    // If no role matches, throw an error
    if (!callbackUrl) {
      throw new Error('User role is not recognized.');
    }

    // Redirect to the appropriate dashboard
    window.location.href = callbackUrl;

    // Revalidate the cache for the home path
    revalidatePath('/');
  } catch (error) {
    console.error('Login error:', error);
    throw new Error('Failed to login.');
  }
};

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

