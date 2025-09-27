"use client";
import React from "react";
import s from "./Main.module.css";
import { PrimaryButton } from "@/ui/PrimaryButton";

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
      <input
        type="email"
        placeholder="example@email.com"
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
