"use client";

import { ReactNode } from "react";
import styles from "./Wrapper.module.css";

type WrapperProps = {
  children: ReactNode;
};

export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <>
      <div className={styles.wrapper}>{children}</div>
    </>
  );
};
