import React from "react";
import styles from "./Ui.module.css";

interface SpinnerProps {
  size?: 24 | 50 | 100 | 48 | 32 | 64 | number;
  color?: string;
}

const Spinner = ({ size, color }: SpinnerProps) => {
  return (
    <div
      className={color == "#fff" ? styles.spinner : styles.spinnerDark}
      style={{ width: size, height: size }}
    ></div>
  );
};

export default Spinner;
