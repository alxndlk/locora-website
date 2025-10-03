"use client";

import styles from "./Promo.module.css";
import { PrimaryButton } from "../ui/PrimaryButton/PrimaryButton";
import { cards } from "@/constants";
import { motion } from "framer-motion";
import { useRevealOnView, fadeUp, fadeIn } from "@/hooks/useMotion";

export default function Promo() {
  const list = useRevealOnView<HTMLDivElement>({ amount: 0.35 });
  const cta = useRevealOnView<HTMLDivElement>({ amount: 0.4 });

  const listVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.08 },
    },
    peek: { opacity: 0.95 },
  } as const;

  return (
    <section className={styles.wrap} aria-labelledby="promo-heading">
      <div className={styles.container}>
        <motion.div
          ref={list.ref}
          className={styles.content}
          variants={listVariants}
          initial={list.initial}
          animate={list.controls}
        >
          {cards.map((c, i) => (
            <motion.div key={i} className={styles.card} variants={fadeUp}>
              <p className={styles.kicker}>{c.kicker}</p>

              <h3
                className={styles.headline}
                id={i === 0 ? "promo-heading" : undefined}
              >
                {c.headline}
                {c.title && <span className={styles.title}>{c.title}</span>}
              </h3>

              <p className={styles.body}>{c.body}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          ref={cta.ref}
          variants={fadeIn}
          initial={cta.initial}
          animate={cta.controls}
        >
          <PrimaryButton
            text="Try for free*"
            fontSize={16}
            fontWeight={400}
            paddingButton="12px 22px"
            buttonSize={44}
            widthButton="max-content"
          />
        </motion.div>
      </div>
    </section>
  );
}
