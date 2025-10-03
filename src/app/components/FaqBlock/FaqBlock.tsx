"use client";

import styles from "./FaqBlock.module.css";
import { faqs } from "@/constants";
import { useAnimatedDetails } from "@/hooks/useAnimatedDetails";
import { Icons } from "@/icons";

export default function FaqBlock() {
  useAnimatedDetails();

  return (
    <section className={styles.wrap} aria-labelledby="faq-heading">
      <div className={styles.container}>
        <h2 id="faq-heading" className={styles.title}>
          Questions? <span>Answers.</span>
        </h2>

        <div className={styles.list} role="list">
          {faqs.map((f, i) => (
            <details key={i} className={styles.item}>
              <summary className={styles.summary}>
                {f.q}
                {Icons.chevrons.down({
                  size: 28,
                  color: "#86868b",
                  className: styles.chevron,
                  "aria-hidden": true,
                })}
              </summary>

              <div className={styles.panel}>
                <div className={styles.answer}>{f.a}</div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
