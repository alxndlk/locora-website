/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect } from "react";
import {
  useAnimation,
  useInView,
  useScroll,
  useTransform,
  type Variants,
  type Transition,
} from "framer-motion";

export const springQuick: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 28,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: springQuick },
  peek: {
    opacity: 0.92,
    y: -8,
    filter: "blur(0.5px)",
    transition: { ...springQuick, duration: 0.3 },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: springQuick },
  peek: { opacity: 0.92, transition: { ...springQuick, duration: 0.3 } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: springQuick },
  peek: {
    opacity: 0.92,
    scale: 0.995,
    transition: { ...springQuick, duration: 0.3 },
  },
};

type RevealOptions = {
  /** Доля видимой области для триггера (0..1). По умолчанию 0.35 */
  amount?: number;
  /** Отступы для IntersectionObserver (px). Примеры: 100, [0,0,-120,0], { bottom: -160 } */
  margin?: any;
};

/**
 * Повторно проигрывает анимацию при каждом входе/выходе из вьюпорта.
 * Возвращает: ref, controls и initial="hidden"
 */

export function useRevealOnView<T extends HTMLElement = HTMLDivElement>(
  opts?: RevealOptions
) {
  const { amount = 0.35, margin } = opts || {};
  const ref = useRef<T>(null);
  const controls = useAnimation();
  const inView = useInView(ref, { amount, margin });

  useEffect(() => {
    controls.start(inView ? "show" : "peek");
  }, [inView, controls]);

  return { ref, controls, initial: "hidden" as const };
}

type ParallaxOpts = {
  /** Базовое смещение (px). По умолчанию 20 → -20 */
  distance?: number;
  /** Доп. смещение как доля высоты окна: 0.2 = +20vh к distance */
  distanceVH?: number;
  /** Ось параллакса */
  axis?: "y" | "x";
  /** Зона отслеживания для useScroll */
  offset?: any;
};

/**
 * Параллакс по Y или X. Возвращает MotionValue<number>.
 * Применение:
 *   const y = useParallax(ref, { distance: 120, distanceVH: 0.1 });
 *   <motion.div style={{ y }} />
 *
 *   const x = useParallax(ref, { axis: "x", distance: 80 });
 *   <motion.div style={{ x }} />
 */
export function useParallax<T extends HTMLElement = HTMLElement>(
  targetRef: React.RefObject<T>,
  opts: ParallaxOpts = {}
) {
  const {
    distance = 20,
    distanceVH = 0,
    offset = ["start 80%", "end 20%"],
  } = opts;

  const extra =
    typeof window !== "undefined" ? distanceVH * window.innerHeight : 0;
  const total = distance + extra;

  const { scrollYProgress } = useScroll({ target: targetRef, offset });
  const value = useTransform(scrollYProgress, [0, 1], [total, -total]);

  return value;
}
