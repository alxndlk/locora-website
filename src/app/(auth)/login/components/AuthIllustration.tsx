"use client";
import React from "react";
import Image from "next/image";
import s from "./Main.module.css";

export default function AuthIllustration({ step }: { step: "email" | "code" }) {
  return (
    <div className={s.image_holder}>
      <Image
        alt=""
        src={step === "email" ? "/images/plane.png" : "/icons/email.png"}
        width={512}
        height={512}
        className={s.icon}
      />
      {step === "code" && <div className={s.image_overlay} />}
    </div>
  );
}
