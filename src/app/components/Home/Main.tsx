"use client";

import React from "react";
import styles from "./Main.module.css";
import Image from "next/image";
import { motion } from "framer-motion";
import { SecondaryButton } from "../ui/SeconradyButton/SecondaryButton";
import Promo from "../Promo/Promo";
import FaqBlock from "../FaqBlock/FaqBlock";
import Application from "../Application/Application";
import PhoneRow from "../PhoneRow/PhoneRow";

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
        <motion.div variants={itemVariants} className={styles.logo}>
          <Image
            alt=""
            src={"/images/plane.png"}
            width={512}
            height={512}
            className={styles.icon}
          />
        </motion.div>

        <motion.h1 variants={itemVariants}>
          Everything you need all in one place.
        </motion.h1>

        <motion.p variants={itemVariants}>
          Download Locora for free and start exploring the world with ease. Your
          travel companion awaits!
        </motion.p>

        <motion.div variants={itemVariants} className={styles.buttons}>
          <SecondaryButton
            text="Try for free*"
            fontSize={17}
            fontWeight={600}
            paddingButton="18px 31px"
            buttonSize={56}
            buttonColor="rgb(0, 113, 227)"
          />
        </motion.div>
      </motion.div>
      <PhoneRow
        shots={[
          { src: "/images/iphone.png", alt: "Phone 1" },
          { src: "/images/iphone.png", alt: "Phone 2" },
          { src: "/images/iphone.png", alt: "Phone 3" },
          { src: "/images/iphone.png", alt: "Phone 4" },
          { src: "/images/iphone.png", alt: "Phone 5" },
        ]}
      />
      <Promo />
      <FaqBlock />
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
