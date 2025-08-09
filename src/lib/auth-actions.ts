"use server";

import { createServerSupabaseClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type OtpState = {
  step: "email" | "code" | "done";
  email?: string;
  error?: string;
  message?: string;
  loggedIn?: boolean;
  cooldownUntil?: number;
};

const COOLDOWN_MS = 60_000;

function keyFor(email: string) {
  return `otp_cd:${email.toLowerCase()}`;
}

export async function requestEmailOtp(
  _prev: OtpState,
  formData: FormData
): Promise<OtpState> {
  const supabase = createServerSupabaseClient();
  const email = (formData.get("email") as string)?.trim();
  if (!email) return { step: "email", error: "Email is required" };

  const jar = await cookies();
  const key = keyFor(email);
  const now = Date.now();
  const existing = jar.get(key)?.value ? Number(jar.get(key)!.value) : 0;

  // если кулдаун активен — возвращаем оставшееся время
  if (existing && now < existing) {
    return {
      step: "code",
      email,
      message: "Please wait before resending",
      cooldownUntil: existing,
    };
  }

  // просим OTP только для существующих пользователей
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { shouldCreateUser: false },
  });

  if (error) {
    const msg = /Signups not allowed for otp|not\s*found|no user/i.test(
      error.message
    )
      ? "No account with this email"
      : error.message;
    return { step: "email", error: msg };
  }

  // ставим кулдаун
  const until = now + COOLDOWN_MS;
  jar.set(key, String(until), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: COOLDOWN_MS / 1000,
  });

  return {
    step: "code",
    email,
    message: "We sent a code to your email",
    cooldownUntil: until,
  };
}

export async function verifyEmailOtp(
  prev: OtpState,
  formData: FormData
): Promise<OtpState> {
  const supabase = createServerSupabaseClient();
  const email = (formData.get("email") as string) ?? prev.email ?? "";
  const token = (formData.get("code") as string)?.trim();

  if (!email || !token) {
    return { step: "code", email, error: "Enter the 6-digit code" };
  }

  const { error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });

  if (error) {
    return { step: "code", email, error: "Invalid or expired code" };
  }

  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = createServerSupabaseClient();

  const firstName = formData.get("first-name") as string;
  const lastName = formData.get("last-name") as string;
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        full_name: `${firstName + " " + lastName}`,
        email: formData.get("email") as string,
      },
    },
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signout() {
  const supabase = createServerSupabaseClient();
  await supabase.auth.signOut();
}

export async function signInWithGoogle() {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    console.log(error);
    redirect("/error");
  }

  redirect(data.url);
}
