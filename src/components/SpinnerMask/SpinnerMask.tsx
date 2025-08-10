import Spinner from "@/ui/Spinner";
import React from "react";
import styles from "./SpinnerMask.module.css";

const SpinnerMask = () => {
  return (
    <div className={styles.loading}>
      <Spinner />
    </div>
  );
};

export default SpinnerMask;
