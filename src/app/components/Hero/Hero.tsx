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
      <div className={styles.wrapper}>
        <div className={styles.image} />

        <div className={styles.container}>
          <h1>Meet Cities Like A Local</h1>

          <p>
            Open Locora for a quick city brief, real local tips, and a simple
            way to track your trips.
          </p>

          <div className={styles.buttons}>
            <PrimaryButton
              text="INSTALL ON IOS"
              fontSize={13}
              iconPosition="left"
              icon="GoArrowUpRight"
              iconSize={16}
              fontWeight={400}
              paddingButton="12.5px 14px;"
              widthButton="max-content"
            />
            <SecondaryButton
              text="FEATURE TOUR"
              fontSize={13}
              iconPosition="left"
              icon="IoInformationCircleSharp"
              iconSize={16}
              widthButton="max-content"
              fontWeight={400}
              paddingButton="12.5px 14px;"
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
