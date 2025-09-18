import { NextRequest, NextResponse } from "next/server";
import { publicPages, festivalDate, publicIn27 } from "@/shared/config/authConfig";

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api|images|video|files).*)",
    "/signin",
    "/robots.txt",
  ],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const role = request.cookies.get("role")?.value;

  if (role !== "ROLE_ADMIN" && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

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

  // if (publicIn18.includes(pathname) && new Date() < ticketOpenDate) {
  //   if (role !== "ROLE_ADMIN") {
  //     // const currentDate = new Date();

  //     if (role === "ROLE_USER") {
  //       return NextResponse.redirect(new URL("/home", request.url));
  //     }
  //   }
  // }

  if (publicIn27.includes(pathname)) {
    if (role !== "ROLE_ADMIN" && new Date() < festivalDate) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
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
