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
          Unmatched productivity
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Huly is a process, project, time, and knowledge management platform
          that provides amazing collaboration opportunities for developers and
          product teams alike.
        </motion.p>

        <ul className={styles.flex}>
          {[
            {
              title: "Keyboard shortcuts.",
              text: "Work efficiently with instant access to common actions.",
            },
            {
              title: "Team Planner.",
              text: "Keep track of the bigger picture by viewing all tasks in one centralized calendar.",
            },
            {
              title: "Time-blocking.",
              text: "Transform daily tasks into structured time blocks for focused productivity.",
            },
            {
              title: "Notifications.",
              text: "Keep up to date with any changes by receiving instant notifications.",
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
