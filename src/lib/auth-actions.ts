"use server";

import { createServerSupabaseClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOLDOWN_MS, OtpState } from "./types/auth";

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

  if (existing && now < existing) {
    return {
      step: "code",
      email,
      message: "Please wait before resending",
      cooldownUntil: existing,
    };
  }

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
    return {
      step: "code",
      email,
      error: "Enter the 6-digit code",
      cooldownUntil: prev.cooldownUntil,
      errorNonce: (prev.errorNonce ?? 0) + 1,
    };
  }

  const { error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });

  if (error) {
    return {
      step: "code",
      email,
      error: "Invalid or expired code",
      cooldownUntil: prev.cooldownUntil,
      errorNonce: (prev.errorNonce ?? 0) + 1,
    };
  }

  return { step: "done", email, loggedIn: true, message: "Signed in" };
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

export async function signInWithGitHub() {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      scopes: "read:user user:email",
    },
  });

  if (error) {
    console.error("GitHub OAuth error:", error);
    return redirect("/error");
  }

  if (data?.url) {
    return redirect(data.url);
  }

  return redirect("/error");
}

export async function signInWithApple() {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "apple",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      scopes: "read:user user:email",
    },
  });

  if (error) {
    console.error("Apple OAuth error:", error);
    return redirect("/error");
  }

  if (data?.url) {
    return redirect(data.url);
  }

  return redirect("/error");
}
