"use client";

import React from "react";
import { motion, easeOut } from "framer-motion";
import styles from "./Knowledge.module.css";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: easeOut,
    },
  }),
};

export const Knowledge = () => {
  return (
    <motion.div
      className={styles.knowledge}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className={styles.container}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Why Travelers Choose Locora
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Arrive in a new place and instantly feel at home. From tourist to
          local fast: skip the search – see what matters now and feel local in
          minutes.
        </motion.p>

        <ul className={styles.flex}>
          {[
            {
              title: "City Search.",
              text: "50,000+ places with clear profiles and instant context.",
            },
            {
              title: "Welcome Brief.",
              text: "Meet any city in seconds with a clean, focused first screen.",
            },
            {
              title: "Notifications.",
              text: " Welcome alerts and updates you control—opt in, opt out.",
            },
            {
              title: "Community.",
              text: " Share tips, like what helps, and help build the guide.",
            },
          ].map((item, i) => (
            <motion.li
              className={styles.card}
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <p>
                <span>{item.title} </span>
                {item.text}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};
