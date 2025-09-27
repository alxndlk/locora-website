"use server";

import { createServerSupabaseClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOLDOWN_MS, OtpState } from "./types/auth";

function keyFor(email: string) {
  return `otp_cd:${email.toLowerCase()}`;
}

const bump = (n?: number) => (n ?? 0) + 1;

export async function requestEmailOtp(
  _prev: OtpState,
  formData: FormData
): Promise<OtpState> {
  const supabase = createServerSupabaseClient();
  const email = (formData.get("email") as string)?.trim();

  if (!email) {
    return {
      step: "email",
      error: "Email is required",
      errorNonce: bump(_prev?.errorNonce),
      infoNonce: _prev?.infoNonce ?? 0,
    };
  }

  const jar = await cookies();
  const key = keyFor(email);
  const now = Date.now();
  const existing = jar.get(key)?.value ? Number(jar.get(key)!.value) : 0;

  if (existing && now < existing) {
    return {
      ..._prev,
      step: _prev?.step ?? "email",
      email,
      message: "Please wait before resending",
      cooldownUntil: existing,
      cooldown: true,
      error: true,
      errorNonce: bump(_prev?.errorNonce),
      infoNonce: _prev?.infoNonce ?? 0,
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

    return {
      step: "email",
      email,
      error: msg,
      errorNonce: bump(_prev?.errorNonce),
      infoNonce: _prev?.infoNonce ?? 0,
    };
  }

  const until = now + COOLDOWN_MS;
  jar.set(key, String(until), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: Math.floor(COOLDOWN_MS / 1000),
  });

  return {
    step: "code",
    email,
    message: "We sent a code to your email",
    cooldownUntil: until,
    errorNonce: _prev?.errorNonce ?? 0,
    infoNonce: bump(_prev?.infoNonce),
  };
}

export async function verifyEmailOtp(
  prev: OtpState,
  formData: FormData
): Promise<OtpState> {
  const supabase = createServerSupabaseClient();
  const email = (formData.get("email") as string)?.trim() || prev?.email || "";
  const token = (formData.get("code") as string)?.trim();

  if (!email || !token) {
    return {
      step: "code",
      email,
      error: "Enter the 6-digit code",
      cooldownUntil: prev?.cooldownUntil,
      errorNonce: bump(prev?.errorNonce),
      infoNonce: prev?.infoNonce ?? 0,
      forceShakeNonce: bump(prev?.forceShakeNonce),
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
      cooldownUntil: prev?.cooldownUntil,
      errorNonce: bump(prev?.errorNonce),
      infoNonce: prev?.infoNonce ?? 0,
      forceShakeNonce: bump(prev?.forceShakeNonce),
    };
  }

  return {
    step: "code",
    email,
    loggedIn: true,
    message: "Signed in",
    errorNonce: prev?.errorNonce ?? 0,
    infoNonce: bump(prev?.infoNonce),
  };
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
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    console.error(error);
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
    redirect("/error");
  }

  if (data?.url) redirect(data.url);
  redirect("/error");
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
    redirect("/error");
  }

  if (data?.url) redirect(data.url);
  redirect("/error");
}
