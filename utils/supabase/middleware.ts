import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

const PUBLIC_PATHS = ["/login", "/signup", "/auth"];

const isPublic = (pathname: string) =>
  PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));

export const updateSession = async (request: NextRequest) => {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl!, supabaseKey!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // Verifies the JWT and refreshes the session cookies if it has expired.
  const { data } = await supabase.auth.getClaims();
  const isAuthed = !!data?.claims;
  const { pathname } = request.nextUrl;

  const redirectTo = (path: string) => {
    const url = request.nextUrl.clone();
    url.pathname = path;
    url.search = "";
    const response = NextResponse.redirect(url);
    // Keep refreshed session cookies on the redirect response.
    supabaseResponse.cookies.getAll().forEach((c) => response.cookies.set(c));
    return response;
  };

  if (!isAuthed && !isPublic(pathname)) return redirectTo("/login");
  if (isAuthed && (pathname === "/login" || pathname === "/signup")) return redirectTo("/");

  return supabaseResponse;
};
