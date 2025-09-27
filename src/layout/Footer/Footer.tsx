"use client";

import React from "react";
import styles from "./Footer.module.css";
import Link from "next/link";
import { links } from "@/lib/nav";
import { download_app_src, footerText, sections } from "@/constants";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";
import { config } from "@/config";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <ul className={styles.footerText}>
          {footerText.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>

        <div className={styles.grid} role="navigation" aria-label="Footer">
          {sections.map((section) => (
            <div key={section.title} className={styles.section}>
              <h3 className={styles.sectionTitle}>{section.title}</h3>
              <ul className={styles.list}>
                {section.items.map((it) =>
                  it.external ? (
                    <li key={it.label} className={styles.item}>
                      <a
                        href={it.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                      >
                        {it.label}
                      </a>
                    </li>
                  ) : (
                    <li key={it.label} className={styles.item}>
                      <Link href={it.href} className={styles.link}>
                        {it.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>

        {}
        <div
          className={styles.accordions}
          role="navigation"
          aria-label="Footer (mobile)"
        >
          {sections.map((section) => (
            <details key={section.title} className={styles.details}>
              <summary className={styles.summary}>
                {section.title}
                <IoIosArrowForward className={styles.chevron} aria-hidden />
              </summary>
              <ul className={styles.list}>
                {section.items.map((it) =>
                  it.external ? (
                    <li key={it.label} className={styles.item}>
                      <a
                        href={it.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                      >
                        {it.label}
                      </a>
                    </li>
                  ) : (
                    <li key={it.label} className={styles.item}>
                      <Link href={it.href} className={styles.link}>
                        {it.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </details>
          ))}
        </div>

        {}
        <div className={styles.bottom}>
          <div className={styles.left}>
            <span className={styles.copy}>
              © {year} {config.metadata.applicationName}. All rights reserved.
            </span>
            <span className={styles.divider} aria-hidden>
              |
            </span>
            <Link href={links.terms.route} className={styles.smallLink}>
              {links.terms.name}
            </Link>
            <span className={styles.divider} aria-hidden>
              |
            </span>
            <Link href={links.privacy.route} className={styles.smallLink}>
              {links.privacy.name}
            </Link>
          </div>

          <a className={styles.download} href={links.download.route}>
            <Image
              src={download_app_src}
              alt={download_app_src}
              width={2560}
              height={856}
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
