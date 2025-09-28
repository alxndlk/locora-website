"use client";

import React from "react";
import styles from "./HoverMenu.module.css";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { containerVariants } from "@/variants";
import { setColorTheme } from "@/utils/themeSchema";
import { HoverMenuProps } from "@/lib/types/types";
import { config } from "@/config";

const HoverMenu: React.FC<HoverMenuProps> = ({
  open,
  setOpen,
  menuData,
  theme,
}) => {
  if (config.debug) {
    console.log("HoverMenu Rendered with menuData:", menuData);
  }

  const data = menuData;
  const contentClass = setColorTheme(styles, theme, "content");
  const headingClass = setColorTheme(styles, theme, "heading");
  const linkClass = setColorTheme(styles, theme, "link");

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={open ? styles.hover_menu : styles.active}
        variants={containerVariants}
        initial="hidden"
        animate={open ? "visible" : "exit"}
        exit="exit"
        onMouseEnter={() => {
          setOpen(open);
        }}
        onClick={() => setOpen(null)}
      >
        <div className={contentClass}>
          <div className={styles.container}>
            {(data ?? []).map((section, idx) => {
              const entries = Object.entries(section.values);
              return (
                <div className={styles.block} key={`${section.name}-${idx}`}>
                  <h2 className={headingClass}>{section.name}</h2>
                  <div className={styles.links}>
                    {entries.map(([key, item]) => {
                      return (
                        <Link
                          key={key}
                          href={item.href}
                          className={linkClass}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={item.description}
                        >
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default React.memo(HoverMenu);
