"use client";

import React from "react";
import styles from "./Footer.module.css";
import { links, socialLinks } from "@/lib/nav";
import Image from "next/image";
import { PrimaryButton } from "@/ui/PrimaryButton";
import { SecondaryButton } from "@/ui/SecondaryButton";
import { motion } from "framer-motion";

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

type FooterProps = {
  size?: boolean;
};

const Footer = ({ size = true }: FooterProps) => {
  return (
    <motion.div
      className={styles.footer}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className={styles.container}>
        {size && (
          <motion.div className={styles.flex} variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <Image
                src={"/images/gif.gif"}
                alt="image"
                width={1024}
                height={1024}
              />
            </motion.div>

            <motion.div
              className={styles.text_container}
              variants={itemVariants}
            >
              <h1>Join the Movement</h1>
              <p>
                Unlock the future of productivity with Huly. Remember, this
                journey is just getting started.
              </p>
              <div className={styles.buttons}>
                <PrimaryButton
                  text="SEE IN ACTION"
                  fontSize={15}
                  iconPosition="left"
                  icon="GoArrowUpRight"
                  iconSize={20}
                  fontWeight={500}
                  paddingButton="14.25px 24px"
                />
                <SecondaryButton
                  text="JOIN OUR SLACK"
                  fontSize={15}
                  iconPosition="left"
                  icon="PiUserList"
                  iconSize={20}
                  fontWeight={500}
                  paddingButton="14.25px 24px"
                />
              </div>
            </motion.div>
          </motion.div>
        )}

        <motion.div className={styles.text} variants={itemVariants}>
          <span>Copyright © 2025 Huly Labs. All rights reserved.</span>
          <ul className={styles.ul}>
            <li>
              <a href={links.terms.route} className={styles.ul_link}>
                {links.terms.name}
              </a>
            </li>
            <li>
              <a href={links.privacy.route} className={styles.ul_link}>
                {links.privacy.name}
              </a>
            </li>
          </ul>
          <div className={styles.social}>
            {Object.values(socialLinks).map(
              ({ name, href, icon: Icon, description }) => (
                <motion.a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={description}
                  className={styles.social_link}
                  variants={itemVariants}
                  whileHover={{ scale: 1.15 }}
                >
                  <Icon size={18} />
                </motion.a>
              )
            )}
          </div>

          <h3 className={styles.alex}>
            Made by <a href="https://t.me/alxndlk">alxndlk</a> for commercial
            use
          </h3>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Footer;
