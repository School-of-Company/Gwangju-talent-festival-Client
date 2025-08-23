import { NextRequest, NextResponse } from "next/server";
import { publicPages } from "@/shared/config/authConfig";

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api|images|video|files).*)",
    "/signin",
    "/robots.txt",
  ],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/robots.txt") {
    const host = request.headers.get("host");
    const targetDomain = "www.광탈페.com";

    if (host && host !== targetDomain) {
      const url = new URL("/robots.txt", `https://${targetDomain}`);
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  if (pathname === "/slogan") {
    return NextResponse.redirect(new URL("/home", request.url));
  }
  if (pathname === "/signin" && accessToken && refreshToken) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (
    !pathname.startsWith("/api") &&
    !pathname.startsWith("/test") &&
    !publicPages.includes(pathname) &&
    !accessToken &&
    !refreshToken
  ) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}
