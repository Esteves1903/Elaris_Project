import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

function buildCsp(nonce: string): string {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const supabaseWs = supabaseUrl.replace(/^https:/, "wss:");
  const isDev = process.env.NODE_ENV === "development";

  // NOTE — style-src 'unsafe-inline' is a known accepted risk.
  // Framer Motion writes animated values directly as inline style attributes
  // (e.g. style="transform: ...") at runtime, making it impossible to hash or
  // nonce those values. Removing 'unsafe-inline' would break all animations.
  // Mitigation: no user-controlled data is ever interpolated into style props;
  // all style values are either static constants or Framer Motion MotionValues.
  // Revisit if Framer Motion adds native CSS-variable-based animation support.
  return [
    `default-src 'self'`,
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""}`,
    `style-src 'self' 'unsafe-inline'`,
    `img-src 'self' data: blob: https://images.unsplash.com`,
    `font-src 'self'`,
    `connect-src 'self' ${supabaseUrl} ${supabaseWs}`,
    `frame-ancestors 'none'`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `upgrade-insecure-requests`,
  ].join("; ");
}

export async function proxy(request: NextRequest) {
  const nonce = btoa(crypto.randomUUID());
  const csp = buildCsp(nonce);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("content-security-policy", csp);

  let response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("content-security-policy", csp);
  // Belt-and-suspenders: explicitly strip X-Powered-By in middleware in addition
  // to poweredByHeader: false in next.config.ts (covers edge-case API responses).
  response.headers.delete("x-powered-by");

  const path = request.nextUrl.pathname;

  if (path.startsWith("/admin") || path.startsWith("/client-area")) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            response = NextResponse.next({ request: { headers: requestHeaders } });
            response.headers.set("content-security-policy", csp);
            response.headers.delete("x-powered-by");
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();
    const role = user?.app_metadata?.role as "admin" | "client" | undefined;

    if (path.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/client-login", request.url));
    }

    if (path.startsWith("/client-area") && !role) {
      return NextResponse.redirect(new URL("/client-login", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
