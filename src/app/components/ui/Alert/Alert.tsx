import React from "react";
import cn from "clsx";
import { motion, } from "framer-motion";
import s from "./Alert.module.css";
import { containerVariants } from "@/lib/animations";
import { ICONS } from "@/constants";
import { AlertProps } from "@/lib/types/types";

const Alert: React.FC<AlertProps> = ({ message, type, className }) => {
  const live = type === "error" ? "assertive" : "polite";

  return (
    <motion.div
      className={cn(s.alert, s[type], className)}
      role="alert"
      aria-live={live}
      variants={containerVariants}
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
