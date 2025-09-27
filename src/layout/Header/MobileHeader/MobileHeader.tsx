"use client";

import React, { useEffect, useRef } from "react";
import styles from "./MobileHeader.module.css";
import Link from "next/link";
import Image from "next/image";
import { FaXmark } from "react-icons/fa6";
import { MdOutlineLogout } from "react-icons/md";
import { useRouter } from "next/navigation";
import { links, socialLinks } from "@/lib/nav";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import AlertBlock from "@/app/components/AlertBlock/AlertBlock";
import { SecondaryButton } from "@/app/components/ui/SeconradyButton/SecondaryButton";
import { PrimaryButton } from "@/app/components/ui/PrimaryButton/PrimaryButton";
import { signout } from "@/lib/auth-actions";
import { MobileHeaderProps } from "@/lib/types/types";

const MobileHeader: React.FC<MobileHeaderProps> = ({
  isOpen,
  onClose,
  user,
  userName,
  avatarURL,
}) => {
  const router = useRouter();
  const panelRef = useRef<HTMLDivElement>(null);

  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.main}
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-menu-title"
      onClick={onClose} 
    >
      <div
        className={styles.container}
        ref={panelRef}
        onClick={(e) => e.stopPropagation()} 
      >
        <div className={styles.top}>
          <div className={styles.left}>
            <Link href="/" className={styles.logo} aria-label="Locora Home">
              <Image src="/plane.png" alt="" width={28} height={28} />
            </Link>
          </div>
          <button
            className={styles.right}
            onClick={onClose}
            aria-label="Close menu"
            type="button"
          >
            <FaXmark />
          </button>
        </div>

        <div className={styles.navBlock}>
          <h2 id="mobile-menu-title" className="sr-only">
            Mobile Menu
          </h2>

          <AlertBlock
            message="Passwordless Authentication"
            type="info"
            description="We use passwordless sign-in. We don’t offer standalone sign-ups. Use your email to log in only if you’ve previously authenticated via a provider (e.g., Google, GitHub, Apple)."
          />

          <div className={styles.row}>
            <div className={styles.userData}>
              {user ? (
                <Link href={links.profile.route} className={styles.user_info}>
                  {avatarURL ? (
                    <Image
                      src={avatarURL}
                      alt={userName ?? "User avatar"}
                      className={styles.avatar}
                      width={32}
                      height={32}
                      unoptimized
                    />
                  ) : (
                    <div className={styles.avatarPlaceholder} />
                  )}
                  <div className={styles.user_text}>
                    <span>{userName}</span>
                    <span className={styles.email}>{user.email}</span>
                  </div>
                </Link>
              ) : (
                <div className={styles.user_buttons}>
                  <SecondaryButton
                    text="Download App"
                    fontSize={13}
                    iconPosition="left"
                    icon="FaAppStore"
                    iconSize={16}
                    fontWeight={400}
                    paddingButton="12.5px 12px"
                    widthButton="max-content"
                    onClick={() => router.push(links.download.route)}
                  />
                  <PrimaryButton
                    text="Sign in"
                    fontSize={13}
                    iconPosition="left"
                    icon="GoArrowUpRight"
                    iconSize={16}
                    fontWeight={500}
                    paddingButton="12.5px 12px"
                    widthButton="max-content"
                    onClick={() => router.push(links.login.route)}
                  />
                </div>
              )}
            </div>

            {user && (
              <button
                className={styles.signout}
                onClick={async () => {
                  await signout();
                  router.push(links.login.route);
                }}
                type="button"
              >
                <MdOutlineLogout size={16} />
                Sign Out
              </button>
            )}
          </div>

          <div className={styles.links}>
            <Link href="mailto:support@locora.app">Get help</Link>
            <Link href={links.terms.route}>Terms of Service</Link>
            <Link href={links.privacy.route}>Privacy Policy</Link>
          </div>

          <div className={styles.socialLinks}>
            {Object.values(socialLinks).map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  className={styles.link}
                  aria-label={link.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {React.createElement(link.icon)}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MobileHeader);
