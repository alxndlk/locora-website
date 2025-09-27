"use client";
import React from "react";
import { ResendCodeProps } from "../../../types";

export default function ResendCode({
  onResend,
  email,
  disabled,
  emailPending,
  cooldownLeft,
  className,
  buttonClassName,
  textClassName,
}: ResendCodeProps) {
  const label = emailPending
    ? "Sending…"
    : cooldownLeft > 0
    ? `Resend OTP (${cooldownLeft}s)`
    : "Resend OTP";

  return (
    <form
      action={onResend}
      className={className}
      style={{
        marginTop: "1.5rem",
        display: "flex",
        gap: "0.5rem",
        alignItems: "center",
      }}
    >
      <input type="hidden" name="email" value={email} />
      <p className={textClassName} style={{ fontSize: "14px" }}>
        Haven&apos;t received the code?
      </p>
      <button
        type="submit"
        disabled={disabled}
        className={buttonClassName}
        aria-disabled={disabled}
        title={cooldownLeft > 0 ? `Try again in ${cooldownLeft}s` : undefined}
      >
        {label}
      </button>
    </form>
  );
}
