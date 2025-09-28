/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";

export function useAnimatedAccordions() {
  useEffect(() => {
    const details = Array.from(
      document.querySelectorAll<HTMLDetailsElement>("[class*='details']")
    );

    const cleanups: Array<() => void> = [];

    details.forEach((el) => {
      const panel = el.querySelector<HTMLElement>("[data-panel]");
      if (!panel) return;

      panel.style.overflow = "hidden";
      if (el.open) {
        panel.style.height = "auto";
      } else {
        panel.style.height = "0px";
      }

      const onToggle = () => {
        const isOpening = el.open;

        const start = isOpening ? 0 : panel.scrollHeight;
        const end = isOpening ? panel.scrollHeight : 0;

        panel.style.height = `${start}px`;
        panel.getBoundingClientRect();
        panel.style.height = `${end}px`;

        const onEnd = (e: TransitionEvent) => {
          if (e.propertyName !== "height") return;
          if (isOpening) {
            panel.style.height = "auto";
          }
          panel.removeEventListener("transitionend", onEnd);
        };
        panel.addEventListener("transitionend", onEnd);
      };

      const onBeforeMatch = () => {
        if (el.open) panel.style.height = "auto";
      };

      el.addEventListener("toggle", onToggle);
      el.addEventListener("beforematch" as any, onBeforeMatch);

      cleanups.push(() => {
        el.removeEventListener("toggle", onToggle);
        el.removeEventListener("beforematch" as any, onBeforeMatch);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);
}
