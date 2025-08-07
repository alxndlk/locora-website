"use client";

import React, { useRef, useEffect, useState } from "react";
import styles from "./Main.module.css";
import Blocks from "./Blocks";

const paragraphs = [
  `Locora helps you decode cities. It's a smart layer of information designed for travelers, digital nomads, and remote workers who want more than just Google Maps.`,
  `Instead of scrolling forums or blogs, you get structured, city-specific insights — from average prices and SIM cards to culture tips, emergency numbers, and hidden gems.`,
  `All data is curated, verified, and easy to digest. You’ll know how much a coffee costs, which local apps to install, how safe the area is, and where to get help if you need it.`,
  `Whether you're landing in Lisbon, Seoul, or Tbilisi, Locora makes your first day feel like your third week — confident, connected, and informed.`,
];

const splitText = (text: string) =>
  text.split(/(\s+|[.,!?;:])/).filter(Boolean);

const Main = () => {
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [visibleMap, setVisibleMap] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const handleScroll = () => {
      const updated: { [key: number]: boolean } = {};

      wordRefs.current.forEach((el, idx) => {
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const wordCenter = rect.top + rect.height / 2;
        const screenCenter = window.innerHeight / 2;
        const range = window.innerHeight * 0.25;

        const isVisible = Math.abs(wordCenter - screenCenter) < range;
        updated[idx] = isVisible;
      });

      setVisibleMap(updated);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  let globalIndex = 0;
  const allWordsNested = paragraphs.map(splitText);

  return (
    <section className={styles.section}>
      <div className={`${styles.overlay} ${styles.topOverlay}`} />
      <div className={`${styles.overlay} ${styles.bottomOverlay}`} />

      <div className={styles.container}>
        {/* TEXT SECTION */}
        <div className={styles.textSection}>
          {allWordsNested.map((words, pIndex) => (
            <p className={styles.paragraph} key={pIndex}>
              {words.map((word, wIndex) => {
                const index = globalIndex++;
                return (
                  <span
                    key={wIndex}
                    ref={(el) => {
                      wordRefs.current[index] = el;
                    }}
                    className={styles.word}
                    style={{
                      opacity: visibleMap[index] ? 1 : 0.15,
                      transform: visibleMap[index]
                        ? "none"
                        : "translateY(12px) scale(0.96)",
                      transition: "opacity 0.4s ease, transform 0.4s ease",
                      whiteSpace: word.match(/\s+/) ? "pre" : "normal",
                    }}
                  >
                    {word}
                  </span>
                );
              })}
            </p>
          ))}
        </div>

        {/* BLOCKS SECTION */}
      </div>

      <div className={styles.blocksSection}>
        <Blocks />
      </div>

      <div className={styles.container}>
        {/* TEXT SECTION */}
        <div className={styles.textSection}>
          {allWordsNested.map((words, pIndex) => (
            <p className={styles.paragraph} key={pIndex}>
              {words.map((word, wIndex) => {
                const index = globalIndex++;
                return (
                  <span
                    key={wIndex}
                    ref={(el) => {
                      wordRefs.current[index] = el;
                    }}
                    className={styles.word}
                    style={{
                      opacity: visibleMap[index] ? 1 : 0.15,
                      transform: visibleMap[index]
                        ? "none"
                        : "translateY(12px) scale(0.96)",
                      transition: "opacity 0.4s ease, transform 0.4s ease",
                      whiteSpace: word.match(/\s+/) ? "pre" : "normal",
                    }}
                  >
                    {word}
                  </span>
                );
              })}
            </p>
          ))}
        </div>

        {/* BLOCKS SECTION */}
      </div>
    </section>
  );
};

export default Main;
