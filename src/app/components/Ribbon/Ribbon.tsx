import React from "react";
import s from "./Ribbon.module.css";
import Link from "next/link";
import { Icons } from "@/icons";

const Ribbon = ({ text, link }: { text: string; link: string }) => {
  return (
    <div className={s.ribbon}>
      <span className={s.text}>
        {text}{" "}
        <Link
          href={link}
          className={s.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          Visit Sandimax {Icons.chevrons.right({ size: 14 })}
        </Link>
      </span>
    </div>
  );
};

export default Ribbon;
