/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useRef } from "react";
import styles from "./MobileHeader.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { links, socialLinks } from "@/lib/nav";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { MobileHeaderProps } from "@/lib/types/types";
import { setColorTheme } from "@/utils/themeSchema";
import SpinnerMask from "@/app/components/ui/SpinnerMask/SpinnerMask";

const MobileHeader: React.FC<MobileHeaderProps> = ({
  isOpen,
  onClose,
  user,
  userName,
  avatarURL,
  theme,
}) => {
  const router = useRouter();
  const panelRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = React.useState(false);

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

  const containerClass = setColorTheme(styles, theme, "mobileHeaderContainer");
  const mobileProfileText = setColorTheme(styles, theme, "mobileProfileText");
  const linksClass = setColorTheme(styles, theme, "link");
  const iconsClass = setColorTheme(styles, theme, "icons");

  return (
    <div
      className={styles.main}
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-menu-title"
      onClick={() => onClose()}
    >
      {loading && <SpinnerMask />}
      <div
        className={containerClass}
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.navBlock}>
          <div className={styles.row}>
            <div className={styles.userData}>
              {user && (
                <Link
                  href={links.profile.route}
                  className={styles.user_info}
                  onClick={() => setLoading(true)}
                >
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
                  <div className={mobileProfileText}>
                    <span>{userName}</span>
                    <p className={styles.email}>{user.email}</p>
                  </div>
                </Link>
              )}
            </div>
          </div>

          <div className={linksClass}>
            {!user && <Link href={links.login.route}>Sign in</Link>}
            <Link href="mailto:support@locora.app">Get help</Link>
            <Link href={links.terms.route}>Terms of Service</Link>
            <Link href={links.privacy.route}>Privacy Policy</Link>
          </div>

          <div className={iconsClass}>
            {Object.values(socialLinks).map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  className={styles.iconSize}
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
