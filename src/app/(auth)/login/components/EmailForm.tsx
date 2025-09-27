"use client";
import React from "react";
import s from "./Main.module.css";
import { PrimaryButton } from "@/ui/PrimaryButton";
import AlertBlock from "@/components/AlertBlock/AlertBlock";

export default function EmailForm({
  disabled,
  onSubmit,
  onEmailChange,
  error,
  loading,
}: {
  disabled: boolean;
  onSubmit: (formData: FormData) => void;
  onEmailChange: (v: string) => void;
  error?: boolean;
  loading?: boolean;
}) {
  return (
    <form className={s.input} action={onSubmit}>
      <AlertBlock
        message="Passwordless Authentication"
        type="info"
        description="We use passwordless sign-in. We don’t offer standalone sign-ups. Use your email to log in only if you’ve previously authenticated via a provider (e.g., Google, GitHub, Apple)."
      />

      <input
        type="email"
        placeholder="example@email.com"
        aria-label="Email address"
        autoFocus
        spellCheck="false"
        required
        name="email"
        className={error ? s.error_input : ""}
        autoComplete="email"
        onChange={(e) => onEmailChange(e.target.value)}
        disabled={disabled}
      />
      <PrimaryButton
        text={disabled ? "Sending…" : "Send code"}
        fontSize={13}
        iconPosition="left"
        icon="GoArrowUpRight"
        iconSize={16}
        fontWeight={500}
        paddingButton="12.5px 20px"
        type="submit"
        loading={loading}
      />
    </form>
  );
}
