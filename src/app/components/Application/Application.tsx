"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./Application.module.css";
import { BiChevronRight } from "react-icons/bi";

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
          <Image src={iconSrc} alt="" width={96} height={96} />
        </div>

        <h2 id="hero-heading" className={styles.title}>
          {title}
        </h2>

        <p className={styles.subtitle}>{subtitle}</p>

        <Link href={cta.href} className={styles.link}>
          {cta.label}
          <BiChevronRight size={24} />
        </Link>
      </div>
    </section>
  );
}
