"use client";

import React from "react";
import styles from "./Header.module.css";
import { motion } from "framer-motion";
import Link from "next/link";
import { TbMenu3 } from "react-icons/tb";
import { PrimaryButton } from "@/app/components/ui/PrimaryButton/PrimaryButton";
import { SecondaryButton } from "@/app/components/ui/SeconradyButton/SecondaryButton";
import MobileHeader from "@/layout/Header/MobileHeader/MobileHeader";
import { HeaderViewProps, SocialLinksMap } from "@/lib/types/types";
import Nav from "./Nav";
import HoverMenu from "./HoverMenu";

const HeaderView: React.FC<HeaderViewProps> = ({
  blackHeader,
  isMobileHeader,
  openMobile,
  closeMobile,
  user,
  userName,
  avatarURL,
  links,
  onGo,
  headerText = "Locora for iOS",
}) => {
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);
  const [menuData, setMenuData] = React.useState<SocialLinksMap>(null);

  return (
    <motion.header
      className={!openMenu ? styles.header : styles.active_header}
      style={blackHeader ? { color: "#0b0d10" } : undefined}
    >
      <MobileHeader
        isOpen={isMobileHeader}
        onClose={closeMobile}
        user={user}
        userName={userName}
        avatarURL={avatarURL}
      />

      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <motion.div
          className={styles.left}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <Link href="/" className={styles.logo}>
            {headerText}
          </Link>
        </motion.div>

        <motion.div
          className={styles.right}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <Nav
            hovered={openMenu}
            onHoverChange={setOpenMenu}
            setMenuData={setMenuData}
          />

          {!user ? (
            <div className={styles.user_buttons}>
              <SecondaryButton
                text="Download App"
                fontSize={12}
                fontWeight={500}
                buttonColor="rgb(0, 113, 227)"
                paddingButton="3px 10px"
                widthButton="max-content"
                onClick={() => onGo(links.download.route)}
              />
              <PrimaryButton
                text="Sign in"
                fontSize={12}
                fontWeight={500}
                paddingButton="3px 10px"
                widthButton="max-content"
                onClick={() => onGo(links.login.route)}
              />
            </div>
          ) : (
            <SecondaryButton
              text={userName}
              fontSize={12}
              fontWeight={500}
              buttonColor="rgb(0, 113, 227)"
              paddingButton="3px 10px"
              widthButton="max-content"
              onClick={() => onGo(links.profile.route)}
            />
          )}

          <div className={styles.menuButton}>
            <TbMenu3
              size={16}
              onClick={openMobile}
              className={styles.menuIcon}
            />
          </div>
        </motion.div>
      </motion.div>
      <HoverMenu open={openMenu} setOpen={setOpenMenu} menuData={menuData} />
    </motion.header>
  );
};

export default HeaderView;
