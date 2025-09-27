"use client";
import React, { useEffect, useState } from "react";
import styles from "./Main.module.css";
import { motion } from "framer-motion";
import { links } from "@/lib/nav";
import { useOtp } from "@/hooks/useOtp";
import { useAuthFlow } from "@/hooks/useAuthFlow";
import AuthHeader from "./AuthHeader";
import AuthIllustration from "./AuthIllustration";
import EmailForm from "./EmailForm";
import OtpForm from "./OtpForm";
import SocialButtons from "./SocialButtons";
import { containerVariants } from "@/variants";

export default function Main() {
  const {
    state,
    email,
    setEmail,
    sendEmail,
    emailPending,
    sendCode,
    codePending,
    loading,
    cooldownLeft,
  } = useAuthFlow();

  const [shake, setShake] = useState(false);
  const otp = useOtp({
    pending: codePending,
    onSubmit: () => {},
  });

  useEffect(() => {
    if (state.step !== "email" && (state.errorNonce ?? 0) > 0) {
      otp.reset();
      setShake(true);
      const t = setTimeout(() => setShake(false), 350);
      return () => clearTimeout(t);
    }
  }, [state.errorNonce, state.step]);

  return (
    <motion.section className={styles.main} initial="hidden" animate="visible">
      <div className={styles.container}>
        <motion.div className={styles.holder} variants={containerVariants}>
          <AuthIllustration step={state.step === "email" ? "email" : "code"} />
          <AuthHeader
            step={state.step === "email" ? "email" : "code"}
            email={email}
          />

          {state.step === "email" ? (
            <EmailForm
              disabled={emailPending}
              onSubmit={sendEmail}
              onEmailChange={setEmail}
              error={!!state.error}
              loading={loading}
            />
          ) : (
            <OtpForm
              onSubmit={sendCode}
              onResend={sendEmail}
              pending={codePending}
              emailPending={emailPending}
              cooldownLeft={cooldownLeft}
              email={email}
              digits={otp.digits}
              setInputRef={otp.setInputRef}
              handleChange={otp.handleChange}
              handleKeyDown={otp.handleKeyDown}
              handlePaste={otp.handlePaste}
              error={!!state.error}
              errorNonce={state.errorNonce ?? 0}
              shake={shake}
              resendClassName={styles.inlineForm}
              resendButtonClassName={styles.get_code}
              resendTextClassName={styles.helpText}
            />
          )}

          {state.step === "email" && <SocialButtons disabled={emailPending} />}
        </motion.div>

        <div className={styles.agreement}>
          <span>
            By clicking you agree to our{" "}
            <a href={links.terms.route}>{links.terms.name}</a> and{" "}
            <a href={links.privacy.route}>{links.privacy.name}</a>
          </span>
        </div>
      </div>
    </motion.section>
  );
}
