// app/(auth)/signup/actions.ts
"use server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function signInWithEmail(email: string) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set() {},
        remove() {},
      },
    }
  );
  const { error } = await supabase.auth.signInWithOtp({ email });
  if (error) throw error;
}
