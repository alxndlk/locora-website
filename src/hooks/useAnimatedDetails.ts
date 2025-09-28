import { useEffect } from "react";
import styles from "../app/components/FaqBlock/FaqBlock.module.css";

export function useAnimatedDetails() {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLDetailsElement>(`.${styles.item}`)
    );

    const cleanups: Array<() => void> = [];

    nodes.forEach((details) => {
      const panel = details.querySelector<HTMLElement>(`.${styles.panel}`);
      if (!panel) return;

      panel.style.overflow = "hidden";
      panel.style.height = details.open ? "auto" : "0px";

      const onToggle = () => {
        const isOpening = details.open;
        const start = isOpening ? 0 : panel.scrollHeight;
        const end = isOpening ? panel.scrollHeight : 0;

        panel.style.height = `${start}px`;
        panel.getBoundingClientRect();
        panel.style.height = `${end}px`;

        const onEnd = (e: TransitionEvent) => {
          if (e.propertyName !== "height") return;
          if (isOpening) panel.style.height = "auto";
          panel.removeEventListener("transitionend", onEnd);
        };
        panel.addEventListener("transitionend", onEnd);
      };

      details.addEventListener("toggle", onToggle);
      cleanups.push(() => details.removeEventListener("toggle", onToggle));
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);
}
