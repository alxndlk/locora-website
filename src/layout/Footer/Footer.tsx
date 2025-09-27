"use client";

import React from "react";
import styles from "./Footer.module.css";
import { links, socialLinks } from "@/lib/nav";
import Image from "next/image";
import { PrimaryButton } from "@/ui/PrimaryButton";
import { SecondaryButton } from "@/ui/SecondaryButton";
import { motion } from "framer-motion";
import { FaApple, FaAppStore } from "react-icons/fa6";

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
    <div className={styles.footer}>
      <div className={styles.container}>
        {size && (
          <motion.div className={styles.flex} variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <Image
                src={"/images/gif.gif"}
                alt="image"
                width={1024}
                height={1024}
                className={styles.img}
              />
            </motion.div>

            <motion.div
              className={styles.text_container}
              variants={itemVariants}
            >
              <h1>Everything you need.</h1>
              <p>
                50,000+ cities ready when you land. This is where every trip
                starts.
              </p>
              <div className={styles.buttons}>
                <PrimaryButton
                  text="DOWNLOAD ON APP STORE"
                  fontSize={15}
                  iconPosition="left"
                  icon="GoArrowUpRight"
                  iconSize={20}
                  fontWeight={500}
                  paddingButton="14.25px 24px"
                  widthButton="max-content"
                />
                <SecondaryButton
                  text="WHAT’S INSIDE"
                  fontSize={15}
                  iconPosition="left"
                  icon="IoInformationCircleSharp"
                  iconSize={20}
                  fontWeight={500}
                  paddingButton="14.25px 24px"
                  widthButton="max-content"
                />
              </div>
            </motion.div>
          </motion.div>
        )}

        <motion.div className={styles.text} variants={itemVariants}>
          <span>
            Copyright &copy; {new Date().getFullYear()} Locora. All rights
            reserved.
          </span>
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
                >
                  <Icon size={18} />
                </motion.a>
              )
            )}
          </div>

          <a className={styles.download} href={links.download.route}>
            Download the app for iOS <FaAppStore />
            <FaApple />
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Footer;
