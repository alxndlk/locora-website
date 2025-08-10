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
    ? `Get a new code (${cooldownLeft}s)`
    : "Get a new code";

  return (
    <form action={onResend} className={className}>
      <input type="hidden" name="email" value={email} />
      <p className={textClassName}>Haven&apos;t received the code?</p>
      <button
        type="submit"
        disabled={disabled}
        className={buttonClassName}
        aria-disabled={disabled}
        style={!disabled ? { cursor: "pointer" } : { cursor: "default" }}
        title={cooldownLeft > 0 ? `Try again in ${cooldownLeft}s` : undefined}
      >
        {label}
      </button>
    </form>
  );
}
