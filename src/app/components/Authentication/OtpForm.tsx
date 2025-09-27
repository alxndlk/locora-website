"use client";
import React, { startTransition } from "react";
import { motion } from "framer-motion";
import OTPInput from "@/app/components/Authentication/OTPInput";
import ResendCode from "@/app/components/Authentication/ResendCode";
import s from "../Authentication/Main.module.css";

export default function OtpForm({
  onSubmit,
  onResend,
  pending,
  emailPending,
  cooldownLeft,
  email,
  digits,
  setInputRef,
  handleChange,
  handleKeyDown,
  handlePaste,
  error,
  errorNonce,
  shake,
  resendClassName,
  resendButtonClassName,
  resendTextClassName,
}: {
  onSubmit: (fd: FormData) => void;
  onResend: (fd: FormData) => void;
  pending: boolean;
  emailPending: boolean;
  cooldownLeft: number;
  email: string;
  digits: string[];
  setInputRef: (i: number) => (el: HTMLInputElement | null) => void;
  handleChange: (i: number, v: string) => void;
  handleKeyDown: (i: number, e: React.KeyboardEvent<HTMLInputElement>) => void;
  handlePaste: (e: React.ClipboardEvent<HTMLDivElement>) => void;
  error: boolean;
  errorNonce: number;
  shake: boolean;
  resendClassName?: string;
  resendButtonClassName?: string;
  resendTextClassName?: string;
}) {
  const lastSubmittedRef = React.useRef<string | null>(null);
  const [forceShakeNonce, setForceShakeNonce] = React.useState(0);

  const submitNow = React.useCallback(
    (code: string) => {
      const fd = new FormData();
      fd.set("email", email ?? "");
      fd.set("code", code);
      lastSubmittedRef.current = code;
      startTransition(() => onSubmit(fd));
    },
    [email, onSubmit]
  );

  React.useEffect(() => {
    const code = digits.join("");
    if (code.length === 6 && !pending && code !== lastSubmittedRef.current) {
      submitNow(code);
    }
  }, [digits, pending, submitNow]);

  const onKeyDownContainer: React.KeyboardEventHandler<HTMLDivElement> = (
    e
  ) => {
    if (e.key === "Enter") {
      const code = digits.join("");
      if (code.length === 6) {
        e.preventDefault();
        setForceShakeNonce((n) => n + 1);
        submitNow(code);
      }
    }
  };

  return (
    <>
      <div className={s.input} onKeyDown={onKeyDownContainer}>
        <motion.div
          animate={
            shake ? { x: [0, -8, 8, -6, 6, -3, 3, 0] as const } : { x: 0 }
          }
          transition={{ duration: 0.35 }}
        >
          <OTPInput
            digits={digits}
            setInputRef={setInputRef}
            handleChange={handleChange}
            handleKeyDown={handleKeyDown}
            handlePaste={handlePaste}
            error={!!error}
            disabled={pending}
            className={s.inputs}
            inputClassName={s.otpInput}
            errorNonce={errorNonce}
            forceShakeNonce={forceShakeNonce}
          />
        </motion.div>
      </div>

      <ResendCode
        email={email}
        onResend={onResend}
        disabled={pending || emailPending || cooldownLeft > 0}
        emailPending={emailPending}
        cooldownLeft={cooldownLeft}
        className={resendClassName}
        buttonClassName={resendButtonClassName}
        textClassName={resendTextClassName}
      />
    </>
  );
}
