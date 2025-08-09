"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./Main.module.css";
import Image from "next/image";
import { links } from "@/lib/nav";
import { PrimaryButton } from "@/ui/PrimaryButton";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import {
  requestEmailOtp,
  verifyEmailOtp,
  type OtpState,
  signInWithGoogle,
} from "@/lib/auth-actions";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.15 },
  },
};

const initialState: OtpState = { step: "email" };

const Main = () => {
  const router = useRouter();

  const [emailState, sendEmail, emailPending] = useActionState(
    requestEmailOtp,
    initialState
  );
  const [codeState, sendCode, codePending] = useActionState(
    verifyEmailOtp,
    initialState
  );

  const state = codeState.step !== "email" ? codeState : emailState;

  // локальное хранение email для подсказки
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (state.email) setEmail(state.email);
  }, [state.email]);

  // ===== OTP inputs =====
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const formRef = useRef<HTMLFormElement | null>(null);
  const hiddenCodeRef = useRef<HTMLInputElement | null>(null);
  const hiddenEmailRef = useRef<HTMLInputElement | null>(null);

  const resetOtp = () => {
    setDigits(["", "", "", "", "", ""]);
    if (hiddenCodeRef.current) hiddenCodeRef.current.value = "";
    inputsRef.current[0]?.focus();
  };

  // авто‑очистка при ошибке
  useEffect(() => {
    if (state.step === "code" && state.error) {
      resetOtp();
    }
  }, [state.step, state.error]);

  // авто‑рефреш после входа
  useEffect(() => {
    if (state.loggedIn) router.refresh();
  }, [state.loggedIn, router]);

  const handleChange = (idx: number, val: string) => {
    if (codePending) return;
    const d = val.replace(/\D/g, "").slice(0, 1);
    if (!d && digits[idx] === "") return;

    const next = [...digits];
    next[idx] = d;
    setDigits(next);

    if (d && idx < 5) inputsRef.current[idx + 1]?.focus();

    const code = next.join("");
    if (code.length === 6 && !codePending) {
      // заполнено — отправляем
      if (hiddenCodeRef.current) hiddenCodeRef.current.value = code;
      if (hiddenEmailRef.current) hiddenEmailRef.current.value = email;
      formRef.current?.requestSubmit();
    }
  };

  const handleKeyDown = (
    idx: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (codePending) return;
    if (e.key === "Backspace") {
      if (digits[idx]) {
        const next = [...digits];
        next[idx] = "";
        setDigits(next);
      } else if (idx > 0) {
        inputsRef.current[idx - 1]?.focus();
        const next = [...digits];
        next[idx - 1] = "";
        setDigits(next);
      }
      e.preventDefault();
    } else if (e.key === "ArrowLeft" && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
      e.preventDefault();
    } else if (e.key === "ArrowRight" && idx < 5) {
      inputsRef.current[idx + 1]?.focus();
      e.preventDefault();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (codePending) return;
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!text) return;
    e.preventDefault();

    const next = ["", "", "", "", "", ""];
    for (let i = 0; i < text.length && i < 6; i++) next[i] = text[i];
    setDigits(next);

    const code = next.join("");
    if (code.length === 6) {
      if (hiddenCodeRef.current) hiddenCodeRef.current.value = code;
      if (hiddenEmailRef.current) hiddenEmailRef.current.value = email;
      formRef.current?.requestSubmit();
    } else {
      inputsRef.current[text.length]?.focus();
    }
  };

  const setInputRef = useCallback(
    (idx: number) => (el: HTMLInputElement | null) => {
      inputsRef.current[idx] = el;
    },
    []
  );

  const [cooldownLeft, setCooldownLeft] = useState<number>(0);

  useEffect(() => {
    if (state.cooldownUntil) {
      const tick = () => {
        const left = Math.max(
          0,
          Math.ceil((state.cooldownUntil! - Date.now()) / 1000)
        );
        setCooldownLeft(left);
      };
      tick();
      const id = setInterval(tick, 250);
      return () => clearInterval(id);
    } else {
      setCooldownLeft(0);
    }
  }, [state.cooldownUntil]);

  return (
    <motion.section className={styles.main} initial="hidden" animate="visible">
      <div className={styles.container}>
        <motion.div className={styles.holder} variants={containerVariants}>
          <div className={styles.light} />
          <div className={styles.image_holder}>
            <Image
              alt=""
              src={"/images/logo-white.png"}
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

          {/* Step 1: email */}
          {state.step === "email" && (
            <form className={styles.input} action={sendEmail}>
              <p>Email</p>
              <input
                type="email"
                placeholder="example@email.com"
                required
                name="email"
                className={state.error ? styles.error_input : undefined}
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                disabled={emailPending}
                aria-invalid={!!state.error}
                aria-describedby={state.error ? "email-error" : undefined}
              />

              {state.error && (
                <div id="email-error" className={styles.error}>
                  {state.error === "No account with this email"
                    ? "Account not found"
                    : state.error}
                </div>
              )}

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

          {/* Step 2: OTP (auto-submit, no button) */}
          {state.step === "code" && (
            <>
              <form
                ref={formRef}
                className={styles.input}
                action={sendCode}
                key={state.error ? "err" : "ok"}
              >
                <input
                  ref={hiddenEmailRef}
                  type="hidden"
                  name="email"
                  defaultValue={email}
                />
                <input ref={hiddenCodeRef} type="hidden" name="code" />

                <div className={styles.inputs} onPaste={handlePaste}>
                  {digits.map((v, i) => (
                    <React.Fragment key={i}>
                      <input
                        ref={setInputRef(i)}
                        value={v}
                        onChange={(e) => handleChange(i, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(i, e)}
                        inputMode="numeric"
                        maxLength={1}
                        autoFocus={i === 0}
                        className={state.error && styles.error_input}
                        disabled={codePending}
                        aria-label={`Digit ${i + 1}`}
                      />
                      {i === 2 && <div className={styles.devider} />}
                    </React.Fragment>
                  ))}
                </div>

                {state.error && (
                  <div className={styles.error}>Invalid or expired code</div>
                )}
              </form>

              <div className={styles.paragraph}>
                <p>Can&apos;t find your code? Check your spam folder.</p>
                {/* Resend (same email) */}
                {/* Resend (same email) */}
                <form action={sendEmail} className={styles.inlineForm}>
                  <input type="hidden" name="email" value={email} />
                  <p>Haven&apos;t received the code?</p>

                  <button
                    type="submit"
                    disabled={emailPending || codePending || cooldownLeft > 0}
                    className={styles.get_code}
                    style={
                      cooldownLeft <= 0
                        ? { cursor: "pointer" }
                        : { cursor: "default" }
                    }
                    aria-disabled={
                      emailPending || codePending || cooldownLeft > 0
                    }
                    title={
                      cooldownLeft > 0
                        ? `Try again in ${cooldownLeft}s`
                        : undefined
                    }
                  >
                    {emailPending
                      ? "Sending…"
                      : cooldownLeft > 0
                      ? `Get a new code (${cooldownLeft}s)`
                      : "Get a new code"}
                  </button>
                </form>
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

                {/* GitHub — по аналогии */}
                {/* <form action={signInWithGithub}>
                  <button type="submit">
                    <div className={styles.light} />
                    <FaGithub size={16} />
                    Sign in with GitHub
                  </button>
                </form> */}
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
};

export default Main;
