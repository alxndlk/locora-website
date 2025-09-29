import React from "react";
import s from "./SandimaxHeader.module.css";
import { SANDIMAX_NAVIGATION_LINKS_HEADER } from "@/lib/nav";
import Link from "next/link";

const values = Object.values(SANDIMAX_NAVIGATION_LINKS_HEADER);

const SandimaxNav = () => {
  return (
    <div className={s.nav}>
      {values.map((link) => (
        <Link
          key={link.name}
          href={link.route}
          target="_blank"
          rel="noopener noreferrer"
          className={s.link}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
};

export default SandimaxNav;
