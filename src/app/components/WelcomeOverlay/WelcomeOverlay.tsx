"use client";

import { motion } from "framer-motion";
import styles from "./WelcomeOverlay.module.css";

const headingText = "Locora";
const paragraphText = "The most complete city database ever made.";

export const WelcomeOverlay = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut", delay: 2.8 }}
      className={styles.overlay}
    >
      <h1 className={styles.text}>
        {headingText.split("").map((char, index) => (
          <span
            key={`h-${index}`}
            className={styles.letterHeading}
            style={{ animationDelay: `${0.4 + index * 0.08}s` }}
          >
            <i>{char}</i>
          </span>
        ))}
      </h1>

      <p className={styles.paragraph}>
        {paragraphText.split("").map((char, index) => (
          <span
            key={`p-${index}`}
            className={styles.letter}
            style={{ animationDelay: `${1 + index * 0.03}s` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </p>
    </motion.div>
  );
};
