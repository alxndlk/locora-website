import React from "react";
import styles from "./AuthHeader.module.css";
import Link from "next/link";
import Image from "next/image";

const AuthHeader = () => {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.link}>
        <Image
          src="/images/plane.png"
          alt="Locora Logo"
          width={20}
          height={20}
        />
        Authentication
      </Link>
    </header>
  );
};

export default AuthHeader;
