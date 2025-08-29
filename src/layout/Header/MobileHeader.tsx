"use client";

import React from "react";
import styles from "./MobileHeader.module.css";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FaXmark } from "react-icons/fa6";
import { links, navItems, socialLinks } from "@/lib/nav";
import { NavLink } from "../../../types";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SecondaryButton } from "@/ui/SecondaryButton";
import { User } from "@supabase/supabase-js";
import { containerVariants, contentVariants } from "@/lib/animations";

interface MobileHeaderProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  userName: string | null | undefined;
  avatarURL: string | null | undefined;
}

const navVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
};

const userVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.3 } },
};

const socialVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 300 },
  },
};

const MobileHeader: React.FC<MobileHeaderProps> = ({
  isOpen,
  onClose,
  user,
  userName,
  avatarURL,
}) => {
  const router = useRouter();

  const isInternal = (
    link: NavLink
  ): link is { name: string; route: string; description: string } =>
    "route" in link;

  const navLinks = Object.values(navItems)
    .filter((group) => group.title !== "Community")
    .flatMap((group) =>
      group.values.filter(isInternal).map((item) => (
        <motion.div key={item.route} variants={contentVariants}>
          <Link href={item.route} className={styles.navLink}>
            {item.name}
          </Link>
        </motion.div>
      ))
    );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.main}
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className={styles.container}>
            <div className={styles.top}>
              <div className={styles.left}>
                <Link href="/" className={styles.logo}>
                  Locora
                </Link>
              </div>
              <div className={styles.right}>
                <FaXmark size={20} onClick={onClose} />
              </div>
            </div>
            <motion.div
              className={styles.navBlock}
              variants={navVariants}
              initial="hidden"
              animate="visible"
            >
              <div className={styles.navLinks}>{navLinks}</div>
              <motion.div className={styles.userData} variants={userVariants}>
                <Link href={links.profile.route}>
                  {user ? (
                    <div className={styles.user_info}>
                      <Image
                        src={avatarURL}
                        alt={userName ?? "User avatar"}
                        className={styles.avatar}
                        width={32}
                        height={32}
                        unoptimized
                        onClick={() => {
                          router.push(links.profile.route);
                        }}
                      />
                      <div className={styles.user_text}>
                        <span>{userName}</span>
                        <span className={styles.email}>{user.email}</span>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.user_buttons}>
                      <SecondaryButton
                        text="SIGN IN"
                        buttonSize={32}
                        fontSize={11}
                        fontWeight={700}
                        widthButton="max-content"
                        onClick={() => router.push(links.login.route)}
                      />
                      <SecondaryButton
                        text="SIGN UP"
                        buttonSize={32}
                        fontSize={11}
                        fontWeight={700}
                        widthButton="max-content"
                        onClick={() => router.push(links.signup.route)}
                      />
                    </div>
                  )}
                </Link>
              </motion.div>
              <div className={styles.socialLinks}>
                {Object.values(socialLinks).map((link) => (
                  <motion.div key={link.href} variants={socialVariants}>
                    <Link href={link.href} className={styles.link}>
                      {React.createElement(link.icon)}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default MobileHeader;
