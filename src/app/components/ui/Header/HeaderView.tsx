"use client";

import React from "react";
import styles from "./Header.module.css";
import { motion } from "framer-motion";
import Link from "next/link";
import { HiOutlineChevronUp } from "react-icons/hi2";
import { PrimaryButton } from "@/app/components/ui/PrimaryButton/PrimaryButton";
import { SecondaryButton } from "@/app/components/ui/SeconradyButton/SecondaryButton";
import MobileHeader from "@/layout/Header/MobileHeader/MobileHeader";
import { HeaderViewProps, Section } from "@/lib/types/types";
import Nav from "./Nav";
import HoverMenu from "./HoverMenu";

const HeaderView: React.FC<HeaderViewProps> = ({
  blackHeader,
  openMobile,
  closeMobile,
  user,
  userName,
  avatarURL,
  links,
  onGo,
  headerText = "Locora for iOS",
  theme,
}) => {
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);
  const [menuData, setMenuData] = React.useState<Section[] | null>(null);
  const [rotate, setRotate] = React.useState<number>(180);
  const [isMobileHeader, setIsMobileHeader] = React.useState(false);

  const handleRotate = () => {
    setRotate((prev) => prev + 180);
  };

  return (
    <motion.header
      className={
        !openMenu && !isMobileHeader ? styles.header : styles.active_header
      }
    >
      <MobileHeader
        isOpen={isMobileHeader}
        onClose={closeMobile}
        user={user}
        userName={userName}
        avatarURL={avatarURL}
        theme={blackHeader ? "black" : "white"}
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
          <Link
            href="/"
            className={styles.logo}
            {...(blackHeader && { style: { color: "#000" } })}
          >
            {headerText}
          </Link>
        </motion.div>

        <motion.div
          className={styles.right}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <div
            className={styles.mobile_icon}
            onClick={openMobile}
            aria-label="Open Menu"
          >
            <HiOutlineChevronUp
              size={20}
              onClick={() => (
                handleRotate(), setIsMobileHeader((prev) => !prev)
              )}
              style={{
                transform: `rotate(${rotate}deg)`,
                transition: "transform 0.2s ease-in-out",
              }}
              color={theme === "black" ? "#000" : "#fff"}
            />
          </div>
          <Nav
            hovered={openMenu}
            onHoverChange={setOpenMenu}
            setMenuData={setMenuData}
            theme={blackHeader ? "black" : "white"}
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
              <div className={styles.sign_in}>
                <PrimaryButton
                  text="Sign in"
                  fontSize={12}
                  fontWeight={500}
                  paddingButton="3px 10px"
                  widthButton="max-content"
                  onClick={() => onGo(links.login.route)}
                />
              </div>
            </div>
          ) : (
            <SecondaryButton
              text={
                userName.length > 15 ? userName.slice(0, 12) + "..." : userName
              }
              fontSize={12}
              fontWeight={500}
              buttonColor="rgb(0, 113, 227)"
              paddingButton="3px 10px"
              widthButton="max-content"
              onClick={() => onGo(links.profile.route)}
            />
          )}
        </motion.div>
      </motion.div>
      <HoverMenu
        open={openMenu}
        setOpen={setOpenMenu}
        menuData={menuData}
        theme={blackHeader ? "black" : "white"}
      />
    </motion.header>
  );
};

export default HeaderView;
