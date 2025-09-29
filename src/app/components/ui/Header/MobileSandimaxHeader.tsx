"use client";

import React from "react";
import styles from "./MobileSandimaxHeader.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { containerVariants } from "@/variants";
import { MobileSandimaxHeaderProps } from "@/lib/types/types";
import { SANDIMAX_NAVIGATION_LINKS_HEADER } from "@/lib/nav";
import Link from "next/link";
import { FiX } from "react-icons/fi";

const MobileSandimaxHeader: React.FC<MobileSandimaxHeaderProps> = ({
  open,
  setVisibility,
}) => {
  const values = Object.values(SANDIMAX_NAVIGATION_LINKS_HEADER);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={!open ? styles.active : styles.hover_menu}
        variants={containerVariants}
        initial="hidden"
        animate={open ? "visible" : "exit"}
        exit="exit"
        onMouseEnter={() => {
          setVisibility(true);
        }}
        onClick={() => setVisibility(false)}
      >
        <div className={styles.contentBlack}>
          <div className={styles.container}>
            <div className={styles.block} key={`MobileMenu-2`}>
              {values.map((link) => (
                <Link
                  key={link.route}
                  href={link.route}
                  className={styles.blackLinks}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <FiX onClick={() => setVisibility(false)} className={styles.close} />
      </motion.div>
    </AnimatePresence>
  );
};

export default React.memo(MobileSandimaxHeader);
