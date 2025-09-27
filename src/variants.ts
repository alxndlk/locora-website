import { type Variants, cubicBezier } from "framer-motion";

export const containerVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: cubicBezier(0.22, 0.75, 0.25, 1) },
  },
};

export const shakeX = {
  animate: { x: [0, -8, 8, -6, 6, -3, 3, 0] as const },
  transition: { duration: 0.35 },
};

export const pressY = {
  animate: {
    y: [0, -6, 0, -3, 0] as const,
    scaleY: [1, 0.96, 1, 0.98, 1] as const,
  },
  transition: { duration: 0.28, ease: "easeOut" },
};
