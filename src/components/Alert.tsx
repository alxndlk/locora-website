import React from "react";
import cn from "clsx";
import { motion, type Variants } from "framer-motion";
import { FiCheckCircle, FiAlertCircle, FiInfo } from "react-icons/fi";
import s from "./Styles.module.css";

export interface AlertProps {
  message: React.ReactNode;
  type: "success" | "error" | "info";
  className?: string;
  onClose?: () => void;
}

const ICONS = {
  success: <FiCheckCircle aria-hidden />,
  error: <FiAlertCircle aria-hidden />,
  info: <FiInfo aria-hidden />,
} as const;

const variants: Variants = {
  initial: { y: -12, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.22,
      ease: [0.22, 0.75, 0.25, 1] as const,
    },
  },
  exit: {
    y: -12,
    opacity: 0,
    transition: {
      duration: 0.18,
      ease: "easeInOut",
    },
  },
};

const Alert: React.FC<AlertProps> = ({ message, type, className }) => {
  const live = type === "error" ? "assertive" : "polite";

  return (
    <motion.div
      className={cn(s.alert, s[type], className)}
      role="alert"
      aria-live={live}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      layout
    >
      <span className={s.icon}>{ICONS[type]}</span>
      <div className={s.message}>{message}</div>
    </motion.div>
  );
};

export default React.memo(Alert);
