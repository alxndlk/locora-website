"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./PhoneRow.module.css";

type Props = {
  shots: { src: string; alt?: string }[];
  title?: string;
  subtitle?: string;
};

export default function PhoneRow({ shots, title, subtitle }: Props) {
  const visible = shots.slice(0, 5);

  const movers = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;
    const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

    const update = () => {
      movers.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;

        const start = vh * 0.15;
        const end = vh * 0.75;
        const center = rect.top + rect.height / 2;
        const progress = clamp((end - center) / (end - start));

        const y = (1 - progress) * -48;
        el.style.setProperty("--ty", `${y}px`);
      });
      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className={styles.wrap} aria-labelledby="phone-row-title">
      <div className={styles.container}>
        <div className={styles.row}>
          {visible.map((s, i) => (
            <figure
              key={i}
              className={`${styles.phone} ${i === 2 ? styles.center : ""}`}
              ref={(el) => {
                if (i === 1) movers.current[0] = el;
                if (i === 3) movers.current[1] = el;
              }}
            >
              
              <figure key={i} className={styles.figure}/>
              <span className={styles.shadow} aria-hidden />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
