import React, { useRef } from "react";
import { motion } from "framer-motion";
import s from "./FeatureScrollList.module.css";
import { ScrollText } from "@/constants";
import { containerVariants } from "@/variants";
import { fadeUp } from "@/hooks/useMotion";

export default function FeatureScrollList() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section className={s.section}>
      <motion.div ref={ref} className={s.wrap} variants={containerVariants}>
        {ScrollText.map((it, i) => (
          <motion.div
            key={i}
            className={s.item}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
          >
            <h3 className={s.title}>
              {it.title} <span className={s.subtitle}>{it.subtitle}</span>
            </h3>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
