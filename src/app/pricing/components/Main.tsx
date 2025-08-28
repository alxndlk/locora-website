"use client";

import React, { useRef, useEffect, useState } from "react";
import styles from "./Main.module.css";
import Blocks from "./Blocks";

const paragraphs_top = [
  `Locora helps you skip the noise and feel the rhythm of a new city right away. More than maps, it's context - the local layer travelers and nomads.`,
];

const paragraphs_bottom = [
  `No endless searching, no tourist traps — just the essentials and the hidden gems that make every city feel like home.`,
  `Whether you're landing for a week or staying for months, Locora gives you the confidence to move, explore, and live like a local in minutes.`,
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
  const allWordsNestedTop = paragraphs_top.map(splitText);
  const allWordsNestedBottom = paragraphs_bottom.map(splitText);

  return (
    <section className={styles.section}>
      <div className={`${styles.overlay} ${styles.topOverlay}`} />
      <div className={`${styles.overlay} ${styles.bottomOverlay}`} />

      <div className={styles.container}>
        {/* TEXT SECTION */}
        <div className={styles.textSection}>
          {allWordsNestedTop.map((words, pIndex) => (
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
          {allWordsNestedBottom.map((words, pIndex) => (
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
