"use client";
import * as React from "react";
import styles from "./Main.module.css";
import Image from "next/image";
import { links } from "@/lib/nav";
import { motion } from "framer-motion";
import { FaApple, FaGithub, FaGoogle } from "react-icons/fa6";
import { containerVariants } from "@/lib/animations";
import {
  signInWithGoogle,
  signInWithGitHub,
  signInWithApple,
} from "@/lib/auth-actions";
import { useFormStatus } from "react-dom";
import { useRandomBackground } from "@/hooks/useRandomBackground";

export default function SignupMain() {
  function OAuthButton({
    action,
    icon,
    children,
  }: {
    action: (formData: FormData) => Promise<void> | void;
    icon: React.ReactNode;
    children: React.ReactNode;
  }) {
    return (
      <form action={action}>
        <OAuthSubmit icon={icon}>{children}</OAuthSubmit>
      </form>
    );
  }

  function OAuthSubmit({
    icon,
    children,
  }: {
    icon: React.ReactNode;
    children: React.ReactNode;
  }) {
    const { pending } = useFormStatus();

    return (
      <button type="submit" disabled={pending}>
        <div className={styles.light} />
        {icon}
        {children}
      </button>
    );
  }

  const { bg } = useRandomBackground();

  return (
    <motion.section className={styles.main} initial="hidden" animate="visible">
      <div
        className={styles.bg_wrapper}
        style={bg ? { backgroundImage: `url(${bg})` } : undefined}
      />
      <div className={styles.container}>
        <motion.div className={styles.holder} variants={containerVariants}>
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

          <h3>Create Account</h3>
          <p className={styles.disclaimer}>
            By continuing with Google, GitHub, or Apple, you agree to our{" "}
            <a href={links.terms.route}>{links.terms.name}</a> and{" "}
            <a href={links.privacy.route}>{links.privacy.name}</a>.
          </p>

          <div className={styles.devider_line} />

          <div className={styles.buttons}>
            <OAuthButton
              action={signInWithGoogle}
              icon={<FaGoogle size={16} />}
            >
              Sign up with Google
            </OAuthButton>

            <OAuthButton
              action={signInWithGitHub}
              icon={<FaGithub size={16} />}
            >
              Sign up with GitHub
            </OAuthButton>

            <OAuthButton action={signInWithApple} icon={<FaApple size={16} />}>
              Sign up with Apple
            </OAuthButton>
          </div>
        </motion.div>

        <div className={styles.span}>
          <span>Already have an account? </span>
          <a href={links.login.route}>{links.login.name}</a>
        </div>
      </div>
    </motion.section>
  );
}
