"use client";

import { ReactNode } from "react";
import styles from "./Wrapper.module.css";
import Footer from "../Footer/Footer";
import { Header } from "../Header/Header";

type WrapperProps = {
  children: ReactNode;
  footerLarge?: boolean;
  blackHeader?: boolean;
};

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  footerLarge,
  blackHeader,
}) => {
  return (
    <div className={styles.wrapper}>
      <Header blackHeader={blackHeader} />
      {children}
      <Footer size={footerLarge} />
    </div>
  );
};
