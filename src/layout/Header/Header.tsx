"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronRight, FaGithub } from "react-icons/fa6";
import styles from "./Header.module.css";
import { SecondaryButton } from "@/ui/SecondaryButton";
import { NavLink } from "../../../types";
import { links, navItems } from "@/lib/nav";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { signout } from "@/lib/auth-actions";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";

export const Header = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const supabase = useMemo(() => createClient(), []);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getUser().then(({ data }) => {
      if (mounted) setUser(data.user ?? null);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      sub?.subscription.unsubscribe();
    };
  }, [supabase]);

  const router = useRouter();

  const userName = user?.user_metadata?.full_name ?? user?.email ?? "User";

  const renderNavLink = (link: NavLink, i: number) => {
    const content = (
      <div className={styles.linkContent}>
        <FaChevronRight
          className={styles.chevron_right}
          color="#ccc"
          size={10}
        />
        <div className={styles.linkName}>{link.name}</div>
        <div className={styles.linkDescription}>{link.description}</div>
      </div>
    );

    if ("route" in link) {
      return (
        <Link key={i} href={link.route} className={styles.dropdownItem}>
          {content}
        </Link>
      );
    } else {
      return (
        <a
          key={i}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.dropdownItem}
        >
          {link.icon && (
            <div className={styles.icon}>
              <link.icon size={18} />
            </div>
          )}
          {content}
        </a>
      );
    }
  };

  return (
    <motion.header
      className={styles.header}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
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
            <Image
              src="/images/logo-white.png"
              alt="logo"
              width={1024}
              height={1024}
              className={styles.logoImage}
            />
          </Link>

          <nav className={styles.nav}>
            {Object.entries(navItems).map(([key, item], index) => {
              const isOpen = openMenu === key;

              return (
                <motion.div
                  key={key}
                  className={styles.navItem}
                  onMouseEnter={() => setOpenMenu(key)}
                  onMouseLeave={() => setOpenMenu(null)}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05, duration: 0.3 }}
                >
                  {item.values.length > 1 ? (
                    <div className={styles.navGroup}>
                      <div className={styles.navButton}>
                        {item.title}
                        <FaChevronDown
                          size={8}
                          color="#ccc"
                          className={styles.chevron_top}
                        />
                      </div>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            className={styles.dropdown}
                            initial={{ opacity: 0, y: 6, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.98 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                          >
                            {item.values.map(renderNavLink)}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : "route" in item.values[0] ? (
                    <Link
                      href={item.values[0].route}
                      className={styles.navLink}
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <a
                      href={item.values[0].href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.navLink}
                    >
                      {item.title}
                    </a>
                  )}
                </motion.div>
              );
            })}
          </nav>
        </motion.div>

        <motion.div
          className={styles.right}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.starLink}
          >
            <FaGithub size={16} />
            Star Us
          </a>

          {!user ? (
            <>
              <SecondaryButton
                text="SIGN IN"
                buttonSize={32}
                fontSize={11}
                fontWeight={700}
                onClick={() => router.push(links.login.route)}
              />
              <SecondaryButton
                text="SIGN UP"
                buttonSize={32}
                fontSize={11}
                fontWeight={700}
                onClick={() => router.push(links.signup.route)}
              />
            </>
          ) : (
            <div
              className={styles.profile}
              onMouseEnter={() => setOpenMenu("user")}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <Image
                src={
                  user.user_metadata.avatar_url ?? user.user_metadata.picture
                }
                alt={
                  user.user_metadata.full_name ?? user.email ?? "User avatar"
                }
                className={styles.avatar}
                width={32}
                height={32}
              />

              <AnimatePresence>
                {openMenu === "user" && (
                  <motion.div
                    className={styles.profileDropdown}
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <div
                      className={styles.dropdownItem}
                      onClick={() => {
                        router.push(links.profile.route);
                      }}
                    >
                      <div className={styles.icon}>
                        <FaRegUserCircle size={18} />
                      </div>
                      <div className={styles.primary}>
                        {userName}
                        <div className={styles.secondary}>{user.email}</div>
                      </div>
                    </div>

                    <form
                      action={async () => {
                        signout();
                        router.push(links.login.route);
                      }}
                      className={styles.dropdownItem}
                    >
                      <button type="submit" className={styles.signout}>
                        <div className={styles.icon}>
                          <MdOutlineLogout size={18} />
                        </div>
                        <div className={styles.primary}>
                          Sign Out
                          <div className={styles.secondary}>
                            We will miss you! 🥲
                          </div>
                        </div>
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </motion.div>
    </motion.header>
  );
};
