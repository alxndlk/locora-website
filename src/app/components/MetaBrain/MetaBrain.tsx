"use client";

import React from "react";
import { motion, easeOut } from "framer-motion";
import styles from "./MetaBrain.module.css";

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

export const MetaBrain = () => {
  return (
    <motion.div
      className={styles.MetaBrain}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className={styles.container}>
        <div className={styles.text}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Built by travelers. Made by locals.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Share a tip, help someone land, and get the good stuff when you
            touch down.
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};
