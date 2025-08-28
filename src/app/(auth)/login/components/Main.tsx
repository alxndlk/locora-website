/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useMemo, useState } from "react";
import styles from "./Main.module.css";
import Image from "next/image";
import { links } from "@/lib/nav";
import { PrimaryButton } from "@/ui/PrimaryButton";
import { FaApple, FaGithub, FaGoogle } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import {
  requestEmailOtp,
  verifyEmailOtp,
  signInWithGoogle,
  signInWithGitHub,
  signInWithApple,
} from "@/lib/auth-actions";
import { useCooldown } from "@/hooks/useCooldown";
import { useOtp } from "@/hooks/useOtp";
import { containerVariants } from "@/lib/animations";
import ResendCode from "@/components/auth/ResendCode";
import OTPInput from "@/components/auth/OTPInput";
import SpinnerMask from "@/components/SpinnerMask/SpinnerMask";
import { OtpState } from "@/lib/types/auth";
import { useRandomBackground } from "@/hooks/useRandomBackground";

const initialState: OtpState = { step: "email" };

export default function Main() {
  const router = useRouter();
  const [formLoading, setFormLoading] = React.useState(false);
  const [shake, setShake] = React.useState(false);

  const [emailState, sendEmail, emailPending] = useActionState(
    requestEmailOtp,
    initialState
  );
  const [codeState, sendCode, codePending] = useActionState(
    verifyEmailOtp,
    initialState
  );

  const state = useMemo(() => {
    if (codeState.step !== "email") {
      return {
        ...codeState,
        cooldownUntil:
          codeState.cooldownUntil ?? emailState.cooldownUntil ?? undefined,
        message: codeState.message ?? emailState.message,
      };
    }
    return emailState;
  }, [codeState, emailState]);

  const [email, setEmail] = useState("");
  useEffect(() => {
    if (state.email) setEmail(state.email);
  }, [state.email]);

  const cooldownLeft = useCooldown(state.cooldownUntil);

  const formRef = React.useRef<HTMLFormElement | null>(null);
  const hiddenCodeRef = React.useRef<HTMLInputElement | null>(null);
  const hiddenEmailRef = React.useRef<HTMLInputElement | null>(null);

  const otp = useOtp({
    pending: codePending,
    onSubmit: (six) => {
      if (hiddenCodeRef.current) hiddenCodeRef.current.value = six;
      if (hiddenEmailRef.current) hiddenEmailRef.current.value = email;
      formRef.current?.requestSubmit();
    },
  });

  const handleShake = () => {
    if (codeState.error) {
      otp.reset();
      setShake(true);
      const t = setTimeout(() => setShake(false), 350);
      return () => clearTimeout(t);
    } else return;
  };

  const handleLoading = () => {
    if (codePending || emailPending) {
      setFormLoading(true);
    } else setFormLoading(false);
  };

  useEffect(() => {
    handleShake();
  }, [codeState]);

  useEffect(() => {
    handleLoading();
  }, [codePending, emailPending]);

  useEffect(() => {
    if (state.loggedIn) {
      setFormLoading(true);
      setTimeout(() => {
        router.refresh();
      }, 1000);
    }
  }, [state.loggedIn, router]);

  const { bg } = useRandomBackground();

  return (
    <motion.section className={styles.main} initial="hidden" animate="visible">
      <div
        className={styles.bg_wrapper}
        style={bg ? { backgroundImage: `url(${bg})` } : undefined}
      />
      <div className={styles.container}>
        <motion.div className={styles.holder} variants={containerVariants}>
          {formLoading && <SpinnerMask backdrop={false} />}
          <div className={styles.light} />
          <div className={styles.image_holder}>
            <Image
              alt=""
              src={"/images/plane.png"}
              width={512}
              height={512}
              className={styles.icon}
            />
          </div>

          <h3>Sign in to Locora</h3>

          {state.step !== "email" && (
            <p className={styles.sent_email}>
              We&apos;ve sent a code to <span>{email}</span>.
            </p>
          )}

          {state.step === "email" && (
            <form className={styles.input} action={sendEmail}>
              <p>Email</p>
              <input
                type="email"
                placeholder="example@email.com"
                required
                name="email"
                className={state.error ? styles.error_input : ""}
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                disabled={emailPending}
              />
              {state.error && <div className={styles.error}>{state.error}</div>}
              <PrimaryButton
                text={emailPending ? "Sending…" : "Send code"}
                fontSize={15}
                iconPosition="left"
                icon="GoArrowUpRight"
                iconSize={20}
                fontWeight={500}
                paddingButton="14.25px 24px"
                type="submit"
              />
            </form>
          )}

          {state.step !== "email" && (
            <>
              <form ref={formRef} className={styles.input} action={sendCode}>
                <input
                  ref={hiddenEmailRef}
                  type="hidden"
                  name="email"
                  defaultValue={email}
                />
                <input ref={hiddenCodeRef} type="hidden" name="code" />

                <motion.div
                  animate={
                    shake ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : { x: 0 }
                  }
                  transition={{ duration: 0.35 }}
                >
                  <OTPInput
                    digits={otp.digits}
                    setInputRef={otp.setInputRef}
                    handleChange={otp.handleChange}
                    handleKeyDown={otp.handleKeyDown}
                    handlePaste={otp.handlePaste}
                    error={!!state.error}
                    disabled={codePending}
                    className={styles.inputs}
                    inputClassName={styles.otpInput}
                    dividerClassName={styles.devider}
                  />
                </motion.div>

                {state.error && (
                  <div className={styles.error}>Invalid or expired code</div>
                )}
              </form>

              <div className={styles.paragraph}>
                <p>Can&apos;t find your code? Check your spam folder.</p>
                <ResendCode
                  onResend={sendEmail}
                  email={email}
                  disabled={emailPending || codePending || cooldownLeft > 0}
                  emailPending={emailPending}
                  cooldownLeft={cooldownLeft}
                  className={styles.inlineForm}
                  buttonClassName={styles.get_code}
                />
              </div>
            </>
          )}

          {state.step === "email" && (
            <>
              <div className={styles.or}>
                <span></span>
                <h1>OR</h1>
                <span></span>
              </div>
              <div className={styles.buttons}>
                <form action={signInWithGoogle}>
                  <button type="submit" disabled={emailPending}>
                    <div className={styles.light} />
                    <FaGoogle size={16} />
                    Sign in with Google
                  </button>
                </form>
                <form action={signInWithGitHub}>
                  <button type="submit" disabled={emailPending}>
                    <div className={styles.light} />
                    <FaGithub size={16} />
                    Sign in with GitHub
                  </button>
                </form>
                <form action={signInWithApple}>
                  <button type="submit" disabled={emailPending}>
                    <div className={styles.light} />
                    <FaApple size={16} />
                    Sign in with Apple
                  </button>
                </form>
              </div>
            </>
          )}
        </motion.div>

        <div className={styles.span}>
          <span>Don&apos;t have an account? </span>
          <a href={links.signup.route}>{links.signup.name}</a>
        </div>
      </div>
    </motion.section>
  );
}
