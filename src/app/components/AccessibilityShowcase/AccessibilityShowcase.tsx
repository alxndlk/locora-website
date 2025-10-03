"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import s from "./AccessibilityShowcase.module.css";
import { fadeUp } from "@/hooks/useMotion";
import {
  AccessibilityShowcaseFeatures,
  AccessibilityShowcaseText,
} from "@/constants";

export default function AccessibilityShowcase() {
  const reduce = useReducedMotion();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: reduce
        ? { duration: 0.001 }
        : { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  } as const;

  const item = {
    hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: reduce
        ? { duration: 0.2 }
        : { type: "spring" as const, stiffness: 280, damping: 24 },
    },
  };

  return (
    <section className={s.section} aria-labelledby="access-heading">
      <div className={s.inner}>
        <header className={s.header}>
          <motion.h2
            id="access-heading"
            className={s.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.5 }}
          >
            {AccessibilityShowcaseText.title}
          </motion.h2>
        </header>

        <motion.ul
          className={s.grid}
          role="list"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
        >
          {AccessibilityShowcaseFeatures.map(({ id, label, Icon }) => (
            <motion.li key={id} className={s.card} variants={item}>
              <figure className={s.figure}>
                <Icon aria-labelledby={`${id}-title ${id}-desc`} />
                <figcaption className={s.caption}>
                  <span id={`${id}-title`} className={s.captionTitle}>
                    {label}
                  </span>
                </figcaption>
              </figure>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
