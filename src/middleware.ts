import { NextResponse, type NextRequest } from "next/server"
import { PUBLIC_ROUTES } from "./api/dictioneries";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get('authorization');
  
  if (!token && !PUBLIC_ROUTES.includes(pathname)) {
    console.info('middleware : ', pathname, token, );
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
}