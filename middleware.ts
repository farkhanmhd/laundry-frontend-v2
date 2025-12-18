import { type NextRequest, NextResponse } from "next/server";
import { getMiddlewareSession } from "./lib/modules/auth/auth-helpers";

export async function middleware(request: NextRequest) {
  try {
    // const session = await getMiddlewareSession();
    const session = await getMiddlewareSession();
    const nextUrl = request.nextUrl.pathname;
    // Case 1: No session, and not on the login page -> redirect to login
    if (!session && nextUrl !== "/login") {
      const loginUrl = new URL("/login", request.nextUrl.origin);
      return NextResponse.redirect(loginUrl);
    }

    // Case 2: Session exists, but user is on login or root page -> redirect to POS

    if (
      session &&
      (nextUrl === "/login" || nextUrl === "/maintenance" || nextUrl === "/")
    ) {
      const dashboardUrl = new URL("/dashboard", request.nextUrl.origin);
      return NextResponse.redirect(dashboardUrl);
    }

    // If none of the above, continue to the requested page
    return NextResponse.next();
  } catch {
    // IMPORTANT: Check the current path to avoid a redirect loop.
    const currentPath = request.nextUrl.pathname;

    if (currentPath === "/maintenance") {
      // If the auth service fails, we should still allow access to
      // the login and maintenance pages themselves.
      return NextResponse.next(); // Allow request to proceed
    }

    // For all other pages, redirect to maintenance.
    const maintenanceUrl = new URL("/maintenance", request.nextUrl.origin);
    return NextResponse.redirect(maintenanceUrl);
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
