import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const nextParam = searchParams.get("next") ?? "/";

  // Нормализуем next и запрещаем внешний домен
  const urlFrom = new URL(request.url);
  const urlTo = new URL(nextParam, urlFrom); // относительные пути ок
  if (urlTo.origin !== urlFrom.origin) {
    urlTo.pathname = "/";
    urlTo.search = "";
  }

  // Уберём служебные параметры из URL назначения
  urlTo.searchParams.delete("token_hash");
  urlTo.searchParams.delete("type");
  urlTo.searchParams.delete("next");

  // Заготовим redirect-ответ, в него будем писать куки
  const redirectResponse = NextResponse.redirect(urlTo);

  if (token_hash && type) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            redirectResponse.cookies.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            redirectResponse.cookies.set({ name, value: "", ...options });
          },
        },
      }
    );

    const { error } = await supabase.auth.verifyOtp({ type, token_hash });
    if (!error) {
      return redirectResponse; // сессия установлена, куки записаны
    }
  }

  // Ошибка — редиректим на /error
  const errorUrl = new URL("/", urlFrom);
  return NextResponse.redirect(errorUrl);
}
