"use client";

import React from "react";
import styles from "./Hero.module.css";
import { SecondaryButton } from "@/ui/SecondaryButton";
import { PrimaryButton } from "@/ui/PrimaryButton";

const listItems = [
  "Welcome Brief",
  "City Essentials",
  "Local Tips",
  "Food & Cafes",
  "Travel Stats",
];

export const Hero = () => {
  return (
    <div className={styles.hero}>
      <video
        src="/videos/video_3.mp4"
        className={styles.video}
        loop
        muted
        autoPlay
      />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <h1>Meet Cities Like A Local</h1>

          <p>
            Open Locora for a quick city brief, real local tips, and a simple
            way to track your trips.
          </p>

          <div className={styles.buttons}>
            <PrimaryButton
              text="INSTALL ON IOS"
              fontSize={15}
              iconPosition="left"
              icon="GoArrowUpRight"
              iconSize={20}
              fontWeight={500}
              paddingButton="14.25px 24px"
            />
            <SecondaryButton
              text="FEATURE TOUR"
              fontSize={15}
              iconPosition="left"
              icon="IoInformationCircleSharp"
              iconSize={20}
              fontWeight={500}
              paddingButton="14.25px 24px"
            />
          </div>
        </div>

        <div className={styles.absolute}>
          <h2>From first tap to first step:</h2>
          <ul>
            {listItems.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
