/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from "react";
import s from "./Header.module.css";
import { NAVIGATION_LINKS_HEADER } from "@/constants";
import {
  NavigationHeaderLinks,
  NavProps,
  SocialLinksMap,
} from "@/lib/types/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav: React.FC<NavProps> = ({ hovered, onHoverChange, setMenuData }) => {
  const path = usePathname();

  const isRoute = (
    item: NavigationHeaderLinks[keyof NavigationHeaderLinks]
  ): item is { name: string; route: string } => {
    return (item as { name: string; route: string }).route !== undefined;
  };

  const isGroup = (
    item: NavigationHeaderLinks[keyof NavigationHeaderLinks]
  ): item is { name: string; values: SocialLinksMap } => {
    return (
      (item as { name: string; values: SocialLinksMap }).values !== undefined
    );
  };

  const activeLabel = Object.entries(NAVIGATION_LINKS_HEADER).find(
    ([_, item]) => isRoute(item) && item.route === path
  )?.[0];

  const renderObject = (object: NavigationHeaderLinks) => {
    return Object.entries(object).map(([key, item]) => {
      if (isRoute(item)) {
        const cls =
          activeLabel === key ? `${s.navLink} ${s.active}` : s.navLink;
        return (
          <Link key={key} href={item.route} className={cls}>
            {item.name}
          </Link>
        );
      }

      if (isGroup(item)) {
        const isOpen = hovered === key;
        setMenuData(item.values);

        return (
          <div
            key={key}
            className={s.navGroup}
            onMouseEnter={() => onHoverChange(key)}
            onMouseLeave={() => onHoverChange(null)}
          >
            <button
              type="button"
              className={isOpen ? `${s.navButton} ${s.open}` : s.navButton}
              aria-haspopup="menu"
              aria-expanded={isOpen}
            >
              {item.name}
            </button>
          </div>
        );
      }

      return null;
    });
  };

  return (
    <div className={s.navigation_header}>
      {renderObject(NAVIGATION_LINKS_HEADER)}
    </div>
  );
};

export default React.memo(Nav);
