"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./Application.module.css";
import { Icons } from "@/icons";

type Props = {
  iconSrc: string;
  title: string;
  subtitle: string;
  cta: { label: string; href: string };
};

export default function Application({ iconSrc, title, subtitle, cta }: Props) {
  return (
    <section className={styles.wrap} aria-labelledby="hero-heading">
      <div className={styles.container}>
        <div className={styles.iconWrap} aria-hidden>
          <Image src={iconSrc} alt="" width={512} height={512} className={styles.image}/>
        </div>

        <h2 id="hero-heading" className={styles.title}>
          {title}
        </h2>

        <p className={styles.subtitle}>{subtitle}</p>

        <Link href={cta.href} className={styles.link}>
          {cta.label}
          {Icons.chevrons.right({ size: 20, "aria-hidden": true })}
        </Link>
      </div>
    </section>
  );
}
