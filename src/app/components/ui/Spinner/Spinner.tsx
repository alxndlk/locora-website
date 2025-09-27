import React from "react";
import styles from "./Spinner.module.css";
import { SpinnerProps } from "@/lib/types/types";

const Spinner = ({ size, color }: SpinnerProps) => {
  return (
    <div
      className={color == "#fff" ? styles.spinner : styles.spinnerDark}
      style={{ width: size, height: size }}
    ></div>
  );
};

export default Spinner;
