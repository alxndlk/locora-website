import React from "react";
import styles from "./Ui.module.css";

interface SpinnerProps {
  size?: 24 | 50 | 100 | 48 | 32 | 64;
}

const Spinner = ({ size }: SpinnerProps) => {
  return (
    <div className={styles.spinner} style={{ width: size, height: size }}></div>
  );
};

export default Spinner;
