"use client";

import React from "react";
import styles from "./Footer.module.css";
import Link from "next/link";
import { links } from "@/lib/nav";
import { download_app_src, footerText, sections } from "@/constants";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";
import { config } from "@/config";
import { setColorTheme } from "@/utils/themeSchema";
import { useAnimatedAccordions } from "@/hooks/useAnimatedAccordions";
import { Icons } from "@/icons";

type FooterProps = {
  theme?: "white" | "black";
};

const Footer: React.FC<FooterProps> = ({ theme }) => {
  const year = new Date().getFullYear();
  useAnimatedAccordions();

  const footerClass = setColorTheme(styles, theme, "footer");
  const footerTextTopClass = setColorTheme(styles, theme, "footerTextTop");
  const footerContainerClass = setColorTheme(styles, theme, "footerContainer");
  const gridFooterClass = setColorTheme(styles, theme, "gridFooter");
  const footerTitle = setColorTheme(styles, theme, "footerTitle");
  const footerLinks = setColorTheme(styles, theme, "footerLinks");
  const footerSummary = setColorTheme(styles, theme, "footerSummary");
  const footerList = setColorTheme(styles, theme, "footerList");

  return (
    <footer className={footerClass}>
      <div className={footerContainerClass}>
        <ul className={footerTextTopClass}>
          {footerText.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>

        <div className={gridFooterClass} role="navigation" aria-label="Footer">
          {sections.map((section) => (
            <div key={section.title} className={styles.section}>
              <h3 className={footerTitle}>{section.title}</h3>
              <ul className={styles.list}>
                {section.items.map((it) =>
                  it.external ? (
                    <li key={it.label} className={styles.item}>
                      <a
                        href={it.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={footerLinks}
                      >
                        {it.label}
                      </a>
                    </li>
                  ) : (
                    <li key={it.label} className={styles.item}>
                      <Link href={it.href} className={footerLinks}>
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
              <summary className={footerSummary}>
                {section.title}
                {Icons.chevrons.right({
                  className: styles.chevron,
                  "aria-hidden": true,
                })}
              </summary>

              <div className={styles.panel} data-panel>
                <ul className={footerList}>
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
            <Link href={links.terms.route} className={footerLinks}>
              {links.terms.name}
            </Link>
            <span className={styles.divider} aria-hidden>
              |
            </span>
            <Link href={links.privacy.route} className={footerLinks}>
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
