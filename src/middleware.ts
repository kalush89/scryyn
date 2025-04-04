// import { NextResponse } from 'next/server';
// import { getToken } from 'next-auth/jwt';

// export async function middleware(req: Request) {
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

//   // If no token is found, redirect to the login page
//   if (!token) {
//     return NextResponse.redirect(new URL('/login', req.url));
//   }

//   // Determine the user's role
//   const role = token.role;

//   // Redirect based on the user's role
//   const currentPath = new URL(req.url).pathname;
//   let redirectUrl = '';
//   switch (role) {
//     case 'SUPERADMIN':
//     case 'STAFF':
//     case 'SUPPORT':
//       redirectUrl = '/dashboard/admin';
//       break;
//     case 'DP_MANAGER':
//     case 'DP_STAFF':
//       redirectUrl = '/dashboard/diagnostics-provider';
//       break;
//     case 'PATIENT':
//       redirectUrl = '/dashboard/patient';
//       break;
//     default:
//       redirectUrl = '/unauthorized';
//       break;
//   }

//   // Prevent infinite redirect loop
//   if (currentPath === redirectUrl) {
//     return NextResponse.next();
//   }

//   return NextResponse.redirect(new URL(redirectUrl, req.url));
// }

// export const config = {
//   matcher: ['/dashboard/:path*'],
// };

import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: Request) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // If no token is found, redirect to the login page
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Determine the user's role
  const role = token.role as string;
  const currentPath = new URL(req.url).pathname;

  // Role-based dashboard paths
  const rolePaths: Record<string, string> = {
    SUPERADMIN: '/dashboard/admin',
    STAFF: '/dashboard/admin',
    SUPPORT: '/dashboard/admin',
    DP_MANAGER: '/dashboard/diagnostics-provider',
    DP_STAFF: '/dashboard/diagnostics-provider',
    PATIENT: '/dashboard/patient',
  };

  const expectedPath = rolePaths[role] || '/unauthorized';

  // Prevent infinite redirects by allowing access if already on the right page
  if (currentPath.startsWith(expectedPath)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL(expectedPath, req.url));
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
