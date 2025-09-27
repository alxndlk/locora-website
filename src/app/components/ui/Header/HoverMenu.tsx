"use client";

import React from "react";
import styles from "./HoverMenu.module.css";
import { motion, AnimatePresence } from "framer-motion";
import type { HoverMenuProps } from "@/lib/types/types";
import { containerVariants } from "@/variants";
import Link from "next/link";
import { ADMINISTRATION_LINKS, APPLICATION_SUPPORT_EMAIL } from "@/lib/nav";

const HoverMenu: React.FC<HoverMenuProps> = ({ open, setOpen, menuData }) => {
  const [present, setPresent] = React.useState<boolean>(!!open);
  console.log(menuData);

  React.useEffect(() => {
    if (open && !present) setPresent(true);
  }, [open, present]);

  return (
    <AnimatePresence mode="sync" onExitComplete={() => setPresent(false)}>
      {present && (
        <motion.div
          className={styles.hover_menu}
          variants={containerVariants}
          onClick={() => setOpen(null)}
          onMouseEnter={() => setOpen(open)}
          initial="hidden"
          animate={open ? "visible" : "exit"}
          exit="exit"
        >
          <div className={styles.content}>
            <div className={styles.container}>
              <div className={styles.block}>
                <h1>Explore Socials</h1>
                {menuData &&
                  Object.entries(menuData).map(([key, item]) => (
                    <Link
                      key={key}
                      href={item.href}
                      className={styles.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.name}
                    </Link>
                  ))}
              </div>
              <div className={styles.block}>
                <h1>Administration Links</h1>
                {Object.entries(ADMINISTRATION_LINKS).map(([key, item]) => (
                  <Link
                    key={key}
                    href={item.href}
                    className={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className={styles.block}>
                <h1>Application Support Email</h1>
                {Object.entries(APPLICATION_SUPPORT_EMAIL).map(
                  ([key, item]) => (
                    <Link
                      key={key}
                      href={item.href}
                      className={styles.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.name}
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default React.memo(HoverMenu);
