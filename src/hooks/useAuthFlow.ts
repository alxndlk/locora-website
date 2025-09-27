"use client";

import { useMemo, useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { requestEmailOtp, verifyEmailOtp } from "@/lib/auth-actions";
import { useCooldown } from "@/hooks/useCooldown";
import { useAlert } from "@/context/AlertContext";
import type { OtpState } from "@/lib/types/auth";

const initialState: OtpState = {
  step: "email",
  errorNonce: 0,
  infoNonce: 0,
};

type Step = "email" | "code";
type LastAction = "email" | "code" | null;

export function useAuthFlow() {
  const router = useRouter();
  const { showAlert } = useAlert();

  const [emailState, sendEmail, emailPending] = useActionState(
    requestEmailOtp,
    initialState
  );
  const [codeState, sendCode, codePending] = useActionState(
    verifyEmailOtp,
    initialState
  );

  const [lastAction, setLastAction] = useState<LastAction>(null);

  const sendEmailWrapped = (fd: FormData) => {
    setLastAction("email");
    return sendEmail(fd);
  };
  const sendCodeWrapped = (fd: FormData) => {
    setLastAction("code");
    return sendCode(fd);
  };

  const es = emailState ?? initialState;
  const cs = codeState ?? initialState;

  const merged: OtpState = useMemo(() => {
    if (cs.step !== "email") {
      return {
        ...cs,
        cooldownUntil: cs.cooldownUntil ?? es.cooldownUntil ?? undefined,
        message: cs.message ?? es.message,
        cooldown: cs.cooldown ?? es.cooldown,
        error: cs.error ?? es.error,
        errorNonce: cs.errorNonce ?? es.errorNonce,
        infoNonce: cs.infoNonce ?? es.infoNonce,
        email: cs.email ?? es.email,
      } as OtpState;
    }
    return es;
  }, [cs, es]);

  const nextStepFromServer: Step =
    cs.step !== "email" ? "code" : es.step === "code" ? "code" : "email";

  const [viewStep, setViewStep] = useState<Step>("email");
  useEffect(() => {
    if (lastAction === "email" && (es.error || es.cooldown)) return;
    setViewStep(nextStepFromServer);
  }, [lastAction, es.error, es.cooldown, nextStepFromServer]);

  const [email, setEmail] = useState("");
  useEffect(() => {
    if (merged.email) setEmail(merged.email);
  }, [merged.email]);

  const cooldownLeft = useCooldown(merged.cooldownUntil);

  const lastErrorSeen = useRef(0);
  useEffect(() => {
    const n = merged.errorNonce ?? 0;
    if (n > lastErrorSeen.current && merged.error) {
      lastErrorSeen.current = n;
      const msg =
        typeof merged.error === "string"
          ? merged.error
          : merged.message ?? "Something went wrong";
      showAlert(msg, "error", { duration: 6000 });
    }
  }, [merged.errorNonce, merged.error, merged.message, showAlert]);

  const lastInfoSeen = useRef(0);
  useEffect(() => {
    const n = merged.infoNonce ?? 0;
    if (n > lastInfoSeen.current && merged.message && !merged.error) {
      lastInfoSeen.current = n;
      showAlert(merged.message, "info", { duration: 5000 });
    }
  }, [merged.infoNonce, merged.message, merged.error, showAlert]);

  const SUCCESS_DELAY = 3000;
  useEffect(() => {
    if (!merged.loggedIn) return;

    showAlert("Signed in successfully. Redirecting…", "success", {
      duration: SUCCESS_DELAY,
    });

    const t = window.setTimeout(() => {
      router.replace("/");
    }, SUCCESS_DELAY);

    return () => window.clearTimeout(t);
  }, [merged.loggedIn, router, showAlert]);

  const loading = codePending || emailPending;

  const emailError = lastAction === "email" && !!(es.error || es.cooldown);
  const emailErrorMessage =
    lastAction === "email" && (es.error || es.cooldown)
      ? typeof es.error === "string"
        ? es.error
        : es.message ?? "Please wait before resending."
      : undefined;

  const stateForUi: OtpState = { ...merged, step: viewStep };

  return {
    state: stateForUi,
    email,
    setEmail,
    cooldownLeft,
    sendEmail: sendEmailWrapped,
    emailPending,
    sendCode: sendCodeWrapped,
    codePending,
    loading,
    emailError,
    emailErrorMessage,
  };
}
