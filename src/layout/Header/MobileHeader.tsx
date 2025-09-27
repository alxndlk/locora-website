"use client";

import React from "react";
import styles from "./MobileHeader.module.css";
import Link from "next/link";
import { FaXmark } from "react-icons/fa6";
import { links, socialLinks } from "@/lib/nav";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SecondaryButton } from "@/ui/SecondaryButton";
import { User } from "@supabase/supabase-js";
import AlertBlock from "@/components/AlertBlock/AlertBlock";
import { PrimaryButton } from "@/ui/PrimaryButton";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { sign } from "crypto";
import { signout } from "@/lib/auth-actions";
import { MdOutlineLogout } from "react-icons/md";

interface MobileHeaderProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  userName: string | null | undefined;
  avatarURL: string | null | undefined;
}
const MobileHeader: React.FC<MobileHeaderProps> = ({
  isOpen,
  onClose,
  user,
  userName,
  avatarURL,
}) => {
  const router = useRouter();
  useLockBodyScroll(isOpen);

  return (
    <>
      {isOpen && (
        <div className={styles.main}>
          <div className={styles.container}>
            <div className={styles.top}>
              <div className={styles.left}>
                <Link href="/" className={styles.logo}>
                  <Image src="/plane.png" alt="Locora" width={28} height={28} />
                </Link>
              </div>
              <div className={styles.right} onClick={onClose}>
                <FaXmark />
              </div>
            </div>
            <div className={styles.navBlock}>
              <AlertBlock
                message="Passwordless Authentication"
                type="info"
                description="We use passwordless sign-in. We don’t offer standalone sign-ups. Use your email to log in only if you’ve previously authenticated via a provider (e.g., Google, GitHub, Apple)."
              />
              <div className={styles.row}>
                <div className={styles.userData}>
                  <Link href={links.profile.route}>
                    {user ? (
                      <div className={styles.user_info}>
                        {avatarURL && typeof avatarURL === "string" ? (
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
                        ) : (
                          <div className={styles.avatarPlaceholder} />
                        )}
                        <div className={styles.user_text}>
                          <span>{userName}</span>
                          <span className={styles.email}>{user.email}</span>
                        </div>
                      </div>
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
                  </Link>

                </div>
                {user && (                <button
                  className={styles.signout}
                  onClick={async () => {
                    await signout();
                    router.push(links.login.route);
                  }}
                >
                  <MdOutlineLogout size={16}/>
                  Sign Out
                </button>)}

              </div>
              <div className={styles.links}>
                <Link href="mailto:support@locora.app">Get help</Link>
                <Link href={links.terms.route}>Terms of Service</Link>
                <Link href={links.privacy.route}>Privacy Policy</Link>
              </div>
              <div className={styles.socialLinks}>
                {Object.values(socialLinks).map((link) => (
                  <div key={link.href}>
                    <Link href={link.href} className={styles.link}>
                      {React.createElement(link.icon)}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default MobileHeader;
