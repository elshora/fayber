import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const supportedLanguages = ["en", "ar"];
const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname already starts with a supported language
  const hasLanguagePrefix = supportedLanguages.some(
    (lang) => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`
  );

  if (!hasLanguagePrefix) {
    // Default language to use if no language is specified
    const defaultLanguage = "en";
    // Redirect to the same path but with the default language prefix
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLanguage}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  const token = await getToken({ req: request, secret });

  if (pathname.includes("/auth/login") && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && !pathname.includes("/auth/login")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next|.*\\..*).*)",
};
