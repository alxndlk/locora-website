// middleware.ts
import { type NextRequest, NextResponse } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  // базовый response, в него supabase будет писать куки
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: "", ...options });
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          response.cookies.set({ name, value: "", ...options });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const url = request.nextUrl.clone();
  const path = url.pathname;

  // helper: создать redirect и перенести куки из response
  const withCookiesRedirect = (to: URL) => {
    const r = NextResponse.redirect(to);
    response.cookies.getAll().forEach((c) => r.cookies.set(c));
    return r;
  };

  // 1) Гость не может на /profile → на /login?next=...
  if (!user && path.startsWith("/profile")) {
    url.pathname = "/login";
    url.searchParams.set(
      "next",
      request.nextUrl.pathname + request.nextUrl.search
    );
    return withCookiesRedirect(url);
  }

  // 2) Авторизованный не может на /login или /signup → на /
  if (user && (path === "/login" || path === "/signup")) {
    url.pathname = "/";
    url.searchParams.delete("next");
    return withCookiesRedirect(url);
  }

  // иначе пропускаем
  return response;
}

export const config = {
  matcher: [
    // можно узко: только нужные страницы
    "/login",
    "/signup",
    "/profile",
  ],
};
