import React, { useState } from "react";
import styles from "./Block.module.css";
import { FaCheck } from "react-icons/fa6";
import { IoMdInformationCircle } from "react-icons/io";
import { motion } from "framer-motion";
import { PrimaryButton } from "@/ui/PrimaryButton";

const Blocks = () => {
  const BLOCKS = [
    {
      name: "Basic",
      price: 0,
      type: "/monthly",
      description:
        "Perfect for trying Locora and getting global essentials anywhere.",
      features: [
        {
          value: "Global essentials — welcome brief for 50,000+ cities",
          alt: null,
        },
        {
          value: "Local Tips (home only) — read & publish in your home city",
          alt: null,
        },
        { value: "Tips elsewhere — locked on the free plan", alt: null },
        {
          value: "Travel stats (countries only) — no city count yet",
          alt: null,
        },
        { value: "Profile & starter achievements", alt: null },
      ],
    },
    {
      name: "Pro",
      price: 19,
      tag: "🔥 Most popular",
      coins: ".99",
      type: "/monthly",
      description:
        "Designed for growing teams who need more power and flexibility.",
      features: [
        {
          value: "All cities — arrival brief & essentials in 50,000+ places",
          alt: null,
        },
        {
          value: "Local Tips (worldwide) — read and publish anywhere",
          alt: null,
        },
        {
          value: "Full travel stats — cities, countries, days, streaks",
          alt: "Task assignment, file sharing, comments",
        },
        {
          value: "Smart arrival — notifications and suggestions you control",
          alt: null,
        },
        {
          value: "Profile & achievements — plus early access to new stuff",
          alt: null,
        },
      ],
    },
    {
      name: "Pro",
      price: 89,
      coins: ".99",
      type: "/yearly",
      description: "A lifetime license for solo creators or small teams.",
      features: [
        {
          value: "All cities — arrival brief & essentials in 50,000+ places",
          alt: null,
        },
        {
          value: "Local Tips (worldwide) — read and publish anywhere",
          alt: null,
        },
        {
          value: "Full travel stats — cities, countries, days, streaks",
          alt: null,
        },
        {
          value: "Smart arrival — notifications and suggestions you control",
          alt: null,
        },
        { value: "All future Pro features — included, no renewals", alt: null },
      ],
    },
    {
      name: "Pro + Editing",
      price: 159,
      coins: ".99",
      type: "/yearly",
      tag: "✏️ Edit any city",
      description:
        "Lifetime license + built-in video/audio editing capabilities.",
      features: [
        {
          value:
            "Global editing — update city pages anywhere (texts, basics, phrases)",
          alt: null,
        },
        {
          value:
            "Add places & media — create POIs and upload photos (reviewed before publish)",
          alt: "Trim, merge, subtitles",
        },
        {
          value:
            "Local Tips (worldwide) — read, publish, and refine tips in any city",
          alt: "Up to 4K",
        },
        {
          value: "Full travel stats — cities, countries, days, streaks",
          alt: null,
        },
        {
          value:
            "Priority review & Creator badge — faster moderation + in-app badge",
          alt: null,
        },
        {
          value: "All future Pro features — included for life",
          alt: null,
        },
      ],
    },
  ];

  const [translate, setTranslate] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleClick = (triggeredIndex: number) => {
    console.log(triggeredIndex, currentIndex);
    if (
      currentIndex >= 0 &&
      currentIndex <= 4 &&
      triggeredIndex !== currentIndex
    ) {
      if (currentIndex > triggeredIndex) {
        setCurrentIndex(currentIndex - 1);
        setTranslate(translate + 20);
      } else {
        setCurrentIndex(currentIndex + 1);
        setTranslate(translate - 20);
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.bg} />
      <div className={styles.container}>
        <div
          className={styles.block_container}
          style={{ transform: `translateX(${translate}%)` }}
        >
          {BLOCKS.map((item, key) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: key * 0.1 }}
              className={
                currentIndex !== key
                  ? `${styles.block}`
                  : `${styles.active}-${key}`
              }
              onClick={() => {
                handleClick(key);
              }}
            >
              <div className={styles.light_line} />
              <h3>
                {item.name}
                {item.tag && (
                  <span className={styles.most_popular}>{item.tag}</span>
                )}
              </h3>
              <div className={styles.price}>
                <h1>${item.price}</h1>
                <span>
                  {item.coins} {item.type}
                </span>
              </div>
              <p className={styles.description}>{item.description}</p>
              <span className={styles.line} />
              <ul className={styles.features}>
                {item.features.map((feature, key) => (
                  <li key={key} className={styles.feature}>
                    {feature.value}
                  </li>
                ))}
              </ul>
              <PrimaryButton
                text="GET STARTED"
                fontSize={15}
                iconPosition="left"
                icon="GoArrowUpRight"
                iconSize={20}
                fontWeight={500}
                paddingButton="14.25px 24px"
              />
            </motion.div>
          ))}
        </div>
      </div>
      <div className={styles.overlay}></div>
      <div className={styles.mask}></div>
    </div>
  );
};

export default Blocks;
