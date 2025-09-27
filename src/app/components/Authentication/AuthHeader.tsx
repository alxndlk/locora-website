"use client";
import React from "react";
import s from "../Authentication/Main.module.css";

export default function AuthHeader({
  step,
  email,
}: {
  step: "email" | "code";
  email: string;
}) {
  if (step !== "email") {
    return (
      <>
        <h3>
          Email <h2>Verification</h2>
        </h3>
        <p style={{ marginTop: "1rem" }} className={s.subtitle}>
          We&apos;ve sent an OTP code to <span>{email}</span>. Enter the OTP
          code below to verify your email address.
        </p>
      </>
    );
  }
  return (
    <>
      <h3>Sign in to Locora</h3>
      <p style={{ marginTop: "1rem" }} className={s.subtitle}>
        Open Locora for a quick city brief, real local tips, and a simple way to
        track your trips.
      </p>
    </>
  );
}
