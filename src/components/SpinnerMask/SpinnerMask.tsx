import Spinner from "@/ui/Spinner";
import React from "react";
import styles from "./SpinnerMask.module.css";

const SpinnerMask = ({ backdrop }: { backdrop: boolean }) => {
  return (
    <div className={backdrop ? styles.loadingBackdrop : styles.loading}>
      <Spinner color="#fff" />
    </div>
  );
};

export default SpinnerMask;
