import React from "react";
import styles from "./SpinnerMask.module.css";
import Spinner from "../Spinner/Spinner";

const SpinnerMask = () => {
  return (
    <div className={styles.loading}>
      <Spinner />
    </div>
  );
};

export default SpinnerMask;
