"use client";

import React from "react";
import styles from "./Main.module.css";
import Image from "next/image";
import { PrimaryButton } from "@/ui/PrimaryButton";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Main = () => {
  return (
    <motion.section
      className={styles.main}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className={styles.container} variants={containerVariants}>
        <motion.div variants={itemVariants}>
          <Image
            alt=""
            src={"/images/icon.png"}
            width={512}
            height={512}
            className={styles.icon}
          />
        </motion.div>

        <motion.h1 variants={itemVariants}>All you need in one place</motion.h1>

        <motion.p variants={itemVariants}>
          Easily access online or on macOS, Windows, and Linux. Boost your
          productivity on any platform.
        </motion.p>

        <motion.div variants={itemVariants}>
          <PrimaryButton
            text="DOWNLOAD FOR iOS"
            fontSize={15}
            iconPosition="left"
            icon="FaAppStore"
            iconSize={20}
            fontWeight={500}
            paddingButton="14.25px 24px"
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Main;
