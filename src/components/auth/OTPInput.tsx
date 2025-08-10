"use client";
import React from "react";
import { OTPInputProps } from "../../../types";

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
  dividerClassName,
}: OTPInputProps) {
  return (
    <div className={className} onPaste={handlePaste}>
      {digits.map((v, i) => (
        <React.Fragment key={i}>
          <input
            ref={setInputRef(i)}
            value={v}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            inputMode="numeric"
            maxLength={1}
            className={inputClassName + (error ? " error" : "")}
            disabled={disabled}
            aria-label={`Digit ${i + 1}`}
          />
          {i === 2 && <div className={dividerClassName} />}
        </React.Fragment>
      ))}
    </div>
  );
}
