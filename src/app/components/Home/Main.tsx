"use client";

import React, { useEffect, useState, useMemo } from "react";
import styles from "./Main.module.css";
import Image from "next/image";
import { motion } from "framer-motion";
import { SecondaryButton } from "../ui/SeconradyButton/SecondaryButton";
import Promo from "../Promo/Promo";
import FaqBlock from "../FaqBlock/FaqBlock";
import Application from "../Application/Application";
import PhoneRow from "../PhoneRow/PhoneRow";
import Ribbon from "../Ribbon/Ribbon";
import { config } from "@/config";
import FeatureScrollList from "../FeatureScrollList/FeatureScrollList";
import TownsShowcase from "../TownsShowcase/TownsShowcase";
import GlobalBlocks from "../GlobalBlocks/GlobalBlocks";
import { fadeUp } from "@/hooks/useMotion";
import AccessibilityShowcase from "../AccessibilityShowcase/AccessibilityShowcase";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function useViewportWidth() {
  const [w, setW] = useState<number | null>(null);
  useEffect(() => {
    const update = () => setW(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return w;
}

const Main = () => {
  const width = useViewportWidth();
  const isWide = (width ?? 0) > 1000;

  const btnProps = useMemo(
    () => ({
      paddingButton: `0px ${isWide ? 31 : 22}px`,
      buttonSize: isWide ? 56 : 44,
    }),
    [isWide]
  );

  return (
    <motion.section
      className={styles.main}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Ribbon
        text="This application was developed by the Sandimax Team as part of our commitment to quality software."
        link={config.sandimax.baseURL}
      />

      <motion.div className={styles.container} variants={containerVariants}>
        <motion.div variants={itemVariants} className={styles.logo}>
          <Image
            alt="Locora plane"
            src="/images/plane.png"
            width={1024}
            height={1024}
            className={styles.icon}
            priority
          />
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.5 }}
        >
          All essential features in one solution.
        </motion.h1>

        <motion.p variants={itemVariants}>
          Download Locora free of charge and begin your journey with confidence.
          Your reliable travel assistant is ready to support you.
        </motion.p>

        <motion.div variants={itemVariants} className={styles.buttons}>
          <SecondaryButton
            text="Try for free*"
            fontSize={17}
            fontWeight={600}
            paddingButton={btnProps.paddingButton}
            buttonSize={btnProps.buttonSize}
            buttonColor="#f73558"
          />
        </motion.div>
      </motion.div>

      <PhoneRow
        shots={[
          { src: "/images/home_screen.png", alt: "Phone 1" },
          { src: "/images/iphone.png", alt: "Phone 2" },
          { src: "/images/iphone.png", alt: "Phone 3" },
          { src: "/images/iphone.png", alt: "Phone 4" },
          { src: "/images/iphone.png", alt: "Phone 5" },
        ]}
      />
      <FeatureScrollList />
      <Promo />
      <TownsShowcase />
      <GlobalBlocks />
      <AccessibilityShowcase />
      <FaqBlock />
      <Application
        iconSrc="/images/plane.png"
        subtitle="Begin your journey with Locora today."
        title="Available on the App Store"
        cta={{ label: "Download from App Store", href: "#" }}
      />
    </motion.section>
  );
};

export default Main;
