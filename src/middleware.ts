import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { PUBLIC_ROUTES, ROOT } from "./lib/routes";
export default async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  
  // Fetch the session using NextAuth's JWT token utility
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const isAuthenticated = !!token;

  // Check if the route is public
  const isPublicRoute =
    PUBLIC_ROUTES.some((route) => nextUrl.pathname.startsWith(route)) || nextUrl.pathname === ROOT;

  // Redirect unauthenticated users trying to access protected routes
  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL(ROOT, request.url));
  }

  // Continue if authenticated or accessing a public route
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
