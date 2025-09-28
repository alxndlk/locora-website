import React from "react";
import styles from "./Spinner.module.css";
import { SpinnerProps } from "@/lib/types/types";
import Image from "next/image";

const Spinner = ({ size }: SpinnerProps) => {
  return (
    <Image
      src="/icons/loading.gif"
      className={styles.spinner}
      style={{ width: size, height: size }}
      width={128}
      height={128}
      alt="Loading..."
    />
  );
};

export default Spinner;
