"use client";

import React from "react";
import s from "./Header.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavGroup,
  NavigationHeaderLink,
  NavigationHeaderLinks,
  NavProps,
  NavRoute,
} from "@/lib/types/types";
import { NAVIGATION_LINKS_HEADER } from "@/lib/nav";
import { setColorTheme } from "@/utils/themeSchema";

const isRoute = (x: NavigationHeaderLink): x is NavRoute => "route" in x;
const isGroup = (x: NavigationHeaderLink): x is NavGroup =>
  "values" in x && Array.isArray((x as NavGroup).values);

const Nav: React.FC<NavProps> = ({ onHoverChange, setMenuData, theme }) => {
  const path = usePathname();

  const activeKey = Object.entries(
    NAVIGATION_LINKS_HEADER as NavigationHeaderLinks
  ).find(([, item]) => isRoute(item) && item.route === path)?.[0];

  const LinkClassName = setColorTheme(s, theme, "navLink");
  const ButtonClassName = setColorTheme(s, theme, "navButton");
  const activeClassName = setColorTheme(s, theme, "active");

  const renderObject = (object: NavigationHeaderLinks) =>
    Object.entries(object).map(([key, raw]) => {
      const item = raw as NavigationHeaderLink;

      if (isRoute(item)) {
        return (
          <Link
            key={key}
            href={item.route}
            className={activeKey === key ? activeClassName : LinkClassName}
          >
            {item.name}
          </Link>
        );
      }

      if (isGroup(item)) {
        return (
          <div
            key={key}
            className={s.navGroup}
            onMouseEnter={() => {
              onHoverChange(key);
              setMenuData?.(item.values);
            }}
          >
            <button type="button" className={ButtonClassName}>
              {item.name}
            </button>
          </div>
        );
      }

      return null;
    });

  return (
    <div className={s.navigation_header}>
      {renderObject(
        NAVIGATION_LINKS_HEADER as unknown as NavigationHeaderLinks
      )}
    </div>
  );
};

export default React.memo(Nav);
