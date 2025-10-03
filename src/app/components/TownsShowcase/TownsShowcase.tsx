import React, { useRef } from "react";
import { motion } from "framer-motion";
import s from "./TownsShowcase.module.css";
import MagGrid from "./MagGrid";
import { ICONS, Tiles, TownsShowcaseText } from "@/constants";
import Image from "next/image";
import { links } from "@/lib/nav";
import Link from "next/link";
import { fadeUp } from "@/hooks/useMotion";

export default function TownsShowcase() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section ref={ref} className={s.section}>
      <div className={s.inner}>
        <motion.header className={s.header} initial="hidden" whileInView="show">
          <motion.h2
            className={s.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.5 }}
          >
            {TownsShowcaseText.title}
          </motion.h2>
        </motion.header>

        <MagGrid items={Tiles} />

        <p className={s.subtitle}>{TownsShowcaseText.subtitle}</p>
        <Link href={links.download.route} className={s.ctaWrap}>
          <Image
            src={ICONS.download}
            alt={ICONS.download}
            width={2560}
            height={856}
            className={s.downloadIcon}
          />
        </Link>
      </div>
    </section>
  );
}
