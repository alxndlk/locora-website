"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { OTPInputProps } from "../../../../types";

export default function OTPInput({
  digits,
  setInputRef,
  handleChange,
  handleKeyDown,
  handlePaste,
  error,
  disabled,
  className,
  inputClassName,
  errorNonce = 0,
  forceShakeNonce = 0,
}: OTPInputProps) {
  const [shake, setShake] = useState<boolean[]>(() => digits.map(() => false));

  useEffect(() => {
    setShake(Array.from({ length: digits.length }, () => false));
  }, [digits.length]);

  const triggerShake = (index: number) => {
    setShake((prev) => {
      if (prev[index]) return prev;
      const next = [...prev];
      next[index] = true;
      return next;
    });
  };

  useEffect(() => {
    if (!error) return;
    setShake(Array.from({ length: digits.length }, () => true));
  }, [errorNonce, error, digits.length]);

  useEffect(() => {
    setShake(Array.from({ length: digits.length }, () => true));
  }, [errorNonce, forceShakeNonce, digits.length]);

  useEffect(() => {
    if (!error) return;
    setShake(Array.from({ length: digits.length }, () => true));
  }, [errorNonce, digits.length, error]);

  useEffect(() => {
    if (!forceShakeNonce) return;
    setShake(Array.from({ length: digits.length }, () => true));
  }, [forceShakeNonce, digits.length]);

  const isDigit = (s: string) => /^[0-9]$/.test(s);

  return (
    <div
      className={className}
      onPaste={handlePaste}
      style={{ marginTop: "0.5rem" }}
    >
      {digits.map((v, i) => (
        <React.Fragment key={i}>
          <motion.input
            ref={setInputRef(i)}
            value={v}
            onChange={(e) => {
              const val = e.target.value;
              if (!isDigit(val) && val !== "") {
                triggerShake(i);
                return;
              }
              handleChange(i, val);
            }}
            onKeyDown={(e) => handleKeyDown(i, e)}
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="one-time-code"
            maxLength={1}
            className={inputClassName + (error ? " error" : "")}
            disabled={disabled}
            aria-label={`Digit ${i + 1}`}
            animate={
              shake[i]
                ? { y: [0, -6, 0, -3, 0], scaleY: [1, 0.96, 1, 0.98, 1] }
                : { y: 0, scaleY: 1 }
            }
            transition={{
              duration: 0.28,
              ease: "easeOut",
              times: [0, 0.25, 0.5, 0.75, 1],
            }}
            onAnimationComplete={() => {
              if (shake[i]) {
                setShake((prev) => {
                  const next = [...prev];
                  next[i] = false;
                  return next;
                });
              }
            }}
            style={{ willChange: "transform" }}
            onFocus={(e) => e.currentTarget.select()}
          />
        </React.Fragment>
      ))}
    </div>
  );
}
