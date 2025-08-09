import React, { useState } from "react";
import styles from "./Block.module.css";
import { FaCheck } from "react-icons/fa6";
import { IoMdInformationCircle } from "react-icons/io";
import { motion } from "framer-motion";

const Blocks = () => {
  const BLOCKS = [
    {
      name: "Basic",
      price: 0,
      type: "/monthly",
      description: "Perfect for individuals exploring Locora's core features.",
      features: [
        { value: "1 workspace", alt: null },
        { value: "Up to 3 users", alt: null },
        { value: "Basic collaboration tools", alt: null },
        { value: "Community support", alt: null },
        { value: "5GB media storage", alt: null },
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
        { value: "Unlimited workspaces", alt: null },
        { value: "Up to 15 users", alt: null },
        {
          value: "Advanced collaboration tools",
          alt: "Task assignment, file sharing, comments",
        },
        { value: "Priority email support", alt: null },
        { value: "50GB media storage", alt: null },
      ],
    },
    {
      name: "One time",
      price: 89,
      coins: ".99",
      type: "",
      description: "A lifetime license for solo creators or small teams.",
      features: [
        { value: "1 lifetime workspace", alt: null },
        { value: "Up to 5 users", alt: null },
        { value: "All Pro features included", alt: null },
        { value: "One-time payment, no recurring", alt: null },
        { value: "100GB media storage", alt: null },
      ],
    },
    {
      name: "One time + Editing",
      price: 159,
      coins: ".99",
      type: "",
      tag: "✏️ Edit any town",
      description:
        "Lifetime license + built-in video/audio editing capabilities.",
      features: [
        { value: "Everything in One time plan", alt: null },
        { value: "Built-in video/audio editor", alt: "Trim, merge, subtitles" },
        { value: "Unlimited export quality", alt: "Up to 4K" },
        { value: "Access to future editing features", alt: null },
        { value: "150GB media storage", alt: null },
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
                  <span key={key} className={styles.feature}>
                    <FaCheck size={16} />
                    {feature.value}
                    {feature.alt !== null && (
                      <div className={styles.tip}>
                        <IoMdInformationCircle size={16} />
                      </div>
                    )}
                  </span>
                ))}
              </ul>
              <button className={styles.button}>Start Free</button>
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
