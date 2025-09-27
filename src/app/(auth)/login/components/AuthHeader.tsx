"use client";
import React from "react";

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
          OTP Code <h2>Verification</h2>
        </h3>
        <p style={{ marginTop: "1rem" }}>
          We&apos;ve sent an OTP code to <span>{email}</span>. Enter the OTP
          code below to verify your email address.
        </p>
      </>
    );
  }
  return (
    <>
      <h3>Sign in to Locora</h3>
      <p style={{ marginTop: "1rem" }}>
        Open Locora for a quick city brief, real local tips, and a simple way to
        track your trips.
      </p>
    </>
  );
}
