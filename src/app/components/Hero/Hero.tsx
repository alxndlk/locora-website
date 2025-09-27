"use client";

import React from "react";
import styles from "./Hero.module.css";
import { SecondaryButton } from "@/ui/SecondaryButton";
import { PrimaryButton } from "@/ui/PrimaryButton";
import { links } from "@/lib/nav";
import { useRouter } from "next/navigation";
import AuthIllustration from "@/app/(auth)/login/components/AuthIllustration";



export const Hero = () => {

  const router = useRouter();

  return (
    <div className={styles.hero}>
      <div className={styles.wrapper}>

        <div className={styles.container}>
        <AuthIllustration step="email"/>
          <h1>Start with Locora</h1>

          <p>Open Locora for a quick city brief, real local tips, and a simple
            way to track your trips.
          </p>

          <div className={styles.buttons}>
            <SecondaryButton
              text="Download App"
              fontSize={13}
              iconPosition="left"
              icon="FaAppStore"
              iconSize={16}
              fontWeight={400}
              paddingButton="12.5px 14px"
              widthButton="max-content"
              onClick={() => router.push(links.download.route)}
            />
            <PrimaryButton
              text="Sign In"
              fontSize={13}
              iconPosition="left"
              icon="GoArrowUpRight"
              iconSize={16}
              widthButton="max-content"
              fontWeight={400}
              paddingButton="12.5px 14px"
              onClick={() => router.push(links.login.route)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
