import { type NextRequest, NextResponse } from "next/server";
import { getMiddlewareSession } from "./lib/modules/auth/auth-helpers";

const PUBLIC_PATHS = ["/login", "/register", "/receipt"];

export async function middleware(request: NextRequest) {
  try {
    const session = await getMiddlewareSession();
    const nextUrl = request.nextUrl.pathname;

    const isPublic = PUBLIC_PATHS.some((path) => nextUrl.startsWith(path));

    // Case 1: No session, and not on a public page -> redirect to login
    if (!(session || isPublic)) {
      const loginUrl = new URL("/login", request.nextUrl.origin);
      return NextResponse.redirect(loginUrl);
    }

    // Case 2: Session exists, but user is on a public or root page -> redirect to dashboard
    if (
      session &&
      (isPublic || nextUrl === "/maintenance" || nextUrl === "/")
    ) {
      const dashboardUrl = new URL("/dashboard", request.nextUrl.origin);
      return NextResponse.redirect(dashboardUrl);
    }

    // If none of the above, continue to the requested page
    return NextResponse.next();
  } catch {
    const currentPath = request.nextUrl.pathname;

    // If the auth service fails, allow public paths and maintenance through
    if (currentPath === "/maintenance" || PUBLIC_PATHS.includes(currentPath)) {
      return NextResponse.next();
    }

    // For all other pages, redirect to maintenance
    const maintenanceUrl = new URL("/maintenance", request.nextUrl.origin);
    return NextResponse.redirect(maintenanceUrl);
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
