"use client";
import React from "react";
import Image from "next/image";
import s from "../Authentication/Main.module.css";
import {
  signInWithGoogle,
  signInWithGitHub,
  signInWithApple,
} from "@/lib/auth-actions";

export default function SocialButtons({ disabled }: { disabled: boolean }) {
  return (
    <>
      <div className={s.or}>
        <span></span>
        <h1>OR</h1>
        <span></span>
      </div>
      <div className={s.buttons}>
        <form action={signInWithGoogle}>
          <button type="submit" disabled={disabled}>
            <Image
              src="/icons/search.png"
              alt="Google"
              width={16}
              height={16}
              className={s.icon_google}
            />
            Continue with Google
            <span></span>
          </button>
        </form>
        <form action={signInWithGitHub}>
          <button type="submit" disabled={disabled}>
            <Image
              src="/icons/github.png"
              alt="GitHub"
              width={16}
              height={16}
              className={s.icon_github}
            />
            Continue with GitHub
            <span></span>
          </button>
        </form>
        <form action={signInWithApple}>
          <button type="submit" disabled={disabled}>
            <Image
              src="/icons/apple-logo.png"
              alt="Apple"
              width={16}
              height={16}
              className={s.icon_apple}
            />
            Continue with Apple
            <span></span>
          </button>
        </form>
      </div>
    </>
  );
}
