"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./RoutingHeader.module.css";
import { links } from "@/lib/nav";

function titleFromSlug(slug: string) {
  return decodeURIComponent(slug)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

type LinkType = {
  route: string;
  label?: string;
  name?: string;
};

const allLinks: LinkType[] = Object.values(links);

function labelForPath(path: string) {
  const hit = allLinks.find((l) => l.route === path);
  return hit?.label || hit?.name || titleFromSlug(path.split("/").pop() || "");
}

const RoutingHeader: React.FC = () => {
  const pathname = usePathname() || "/";
  const segments = pathname.split("/").filter(Boolean);

  const lastHref = segments.length ? "/" + segments.join("/") : "/";
  const currentLabel = segments.length ? labelForPath(lastHref) : null;

  return (
    <header className={styles.header}>
      <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
        <div className={styles.row}>
          <Link href={links.home.route} className={styles.link}>
            <Image
              src="/images/plane.png"
              alt=""
              width={18}
              height={18}
              aria-hidden
            />
            <span className={styles.home_page}>{links.home.name}</span>
          </Link>

          {currentLabel && (
            <>
              <span className={styles.sep}> / </span>
              <span className={styles.current} aria-current="page">
                {currentLabel}
              </span>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default RoutingHeader;
