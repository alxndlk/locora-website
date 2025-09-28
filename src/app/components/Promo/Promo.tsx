"use client";

import styles from "./Promo.module.css";
import { PrimaryButton } from "../ui/PrimaryButton/PrimaryButton";

type Card = {
  kicker: string;
  headline: string;
  title?: string;
  body: string;
  cta?: { label: string; href: string; external?: boolean };
  footnote?: string;
};

const cards: Card[] = [
  {
    kicker: "App Store Available",
    headline: "Use for Free",
    cta: { label: "Try for free*", href: "#download" },
    body: "Start your travel log and city welcomes for free. Extras will come via App Store purchases.",
  },
  {
    kicker: "Early access",
    headline: "TestFlight",
    title: "",
    body: "Try pre-release builds first. Features may change; your feedback helps.",
  },
  {
    kicker: "Coming soon",
    headline: "Creator Plan",
    title: "",
    body: "Edit public city pages and add tips. Managed via App Store; cancel anytime in Apple ID.",
  },
];

export default function Promo() {
  return (
    <section className={styles.wrap} aria-labelledby="promo-heading">
      <div className={styles.container}>
        <div className={styles.content}>
          {cards.map((c, i) => (
            <div key={i} className={styles.card}>
              <p className={styles.kicker}>{c.kicker}</p>

              {}
              <h3 className={styles.headline}>
                {c.headline}
                {c.title && <span className={styles.title}>{c.title}</span>}
              </h3>

              <p className={styles.body}>{c.body}</p>
            </div>
          ))}
        </div>
        <PrimaryButton
          text="Try for free*"
          fontSize={16}
          fontWeight={400}
          paddingButton="12px 22px"
          buttonSize={44}
          widthButton="max-content"
        />
      </div>
    </section>
  );
}
