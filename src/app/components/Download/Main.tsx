"use client";

import React from "react";
import styles from "./Main.module.css";
import { motion } from "framer-motion";
import Application from "../Application/Application";

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

const Main = () => {
  return (
    <motion.section
      className={styles.main}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Application
        iconSrc="/images/plane.png"
        subtitle="Start exploring the world with Locora today."
        title="Available on App Store"
        cta={{ label: "Download from App Store", href: "#" }}
      />
    </motion.section>
  );
};

export default Main;
