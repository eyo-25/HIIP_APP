import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  if (req.nextUrl.pathname === "/auth") {
    if (token) {
      return NextResponse.redirect(new URL("/", req.nextUrl.origin));
    }
    return NextResponse.next();
  }

  if (!token) {
    const { pathname, search, origin, basePath } = req.nextUrl;
    const authUrl = new URL(`${basePath}/auth`, origin);
    authUrl.searchParams.append(
      "callbackUrl",
      `${basePath}${pathname}${search}`
    );
    return NextResponse.redirect(authUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/plan",
    "/timer/:path*",
    "/my",
    "/feedback",
    "/write",
    "/write/:path*",
    "/auth",
  ],
};
