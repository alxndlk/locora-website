"use client";

import React from "react";
import { motion, easeOut } from "framer-motion";
import styles from "./Hero.module.css";
import { SecondaryButton } from "@/ui/SecondaryButton";
import { PrimaryButton } from "@/ui/PrimaryButton";

const listItems = [
  "Team Planner",
  "Project Management",
  "Virtual Office",
  "Chat",
  "Documents",
  "Inbox",
];

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
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

export const Hero = () => {
  return (
    <motion.div
      className={styles.hero}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
    >
      <video
        src="/videos/video_3.mp4"
        className={styles.video}
        loop
        muted
        autoPlay
      />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: false }}
          >
            Everything App for your teams
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
            viewport={{ once: false }}
          >
            Huly, an open-source platform, serves as an all-in-one replacement
            of Linear, Jira, Slack, and Notion.
          </motion.p>

          <motion.div
            className={styles.buttons}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
            viewport={{ once: false }}
          >
            <PrimaryButton
              text="GET STARTED NOW"
              fontSize={15}
              iconPosition="left"
              icon="GoArrowUpRight"
              iconSize={20}
              fontWeight={500}
              paddingButton="14.25px 24px"
            />
            <SecondaryButton
              text="VIEW SERVICES"
              fontSize={15}
              iconPosition="left"
              icon="PiUserList"
              iconSize={20}
              fontWeight={500}
              paddingButton="14.25px 24px"
            />
          </motion.div>
        </div>

        <motion.div
          className={styles.absolute}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
          viewport={{ once: false }}
        >
          <h2>Everything you need for productive team work:</h2>
          <ul>
            {listItems.map((item, i) => (
              <motion.li
                key={i}
                custom={i}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};
