"use client";
import * as React from "react";

export function useOtp({
  onSubmit,
  pending,
}: {
  onSubmit: (code: string) => void;
  pending: boolean;
}) {
  const [digits, setDigits] = React.useState<string[]>(
    Array.from({ length: 6 }, () => "")
  );
  const inputsRef = React.useRef<(HTMLInputElement | null)[]>(
    Array.from({ length: 6 }, () => null)
  );
  const submittedRef = React.useRef(false);

  const focusIndex = React.useCallback((i = 0) => {
    inputsRef.current[i]?.focus();
  }, []);

  const unlockSubmit = React.useCallback(() => {
    submittedRef.current = false;
  }, []);

  const reset = React.useCallback(() => {
    submittedRef.current = false;
    setDigits(Array.from({ length: 6 }, () => ""));
    requestAnimationFrame(() => focusIndex(0));
  }, [focusIndex]);

  const trySubmit = React.useCallback(
    (code: string) => {
      if (code.length === 6 && !pending && !submittedRef.current) {
        submittedRef.current = true;
        onSubmit(code);
      }
    },
    [pending, onSubmit]
  );

  const handleChange = React.useCallback(
    (idx: number, raw: string) => {
      if (pending) return;
      const d = raw.replace(/\D/g, "").slice(0, 1);
      if (!d && digits[idx] === "") return;
      const next = [...digits];
      next[idx] = d;
      setDigits(next);
      if (d && idx < 5) focusIndex(idx + 1);
      trySubmit(next.join(""));
    },
    [digits, pending, trySubmit, focusIndex]
  );

  const handleKeyDown = React.useCallback(
    (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (pending) return;
      if (e.key === "Backspace") {
        if (digits[idx]) {
          const next = [...digits];
          next[idx] = "";
          setDigits(next);
        } else if (idx > 0) {
          focusIndex(idx - 1);
          const next = [...digits];
          next[idx - 1] = "";
          setDigits(next);
        }
        e.preventDefault();
      } else if (e.key === "ArrowLeft" && idx > 0) {
        focusIndex(idx - 1);
        e.preventDefault();
      } else if (e.key === "ArrowRight" && idx < 5) {
        focusIndex(idx + 1);
        e.preventDefault();
      }
    },
    [digits, pending, focusIndex]
  );

  const handlePaste = React.useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      if (pending) return;
      const text = e.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, 6);
      if (!text) return;
      e.preventDefault();
      const next = Array.from({ length: 6 }, (_, i) => text[i] ?? "");
      setDigits(next);
      trySubmit(next.join(""));
      if (text.length < 6) focusIndex(text.length);
    },
    [pending, trySubmit, focusIndex]
  );

  const setInputRef = React.useCallback(
    (idx: number) => (el: HTMLInputElement | null) => {
      inputsRef.current[idx] = el;
    },
    []
  );

  return {
    digits,
    setInputRef,
    handleChange,
    handleKeyDown,
    handlePaste,
    reset,
    focusIndex,
    unlockSubmit,
  };
}
