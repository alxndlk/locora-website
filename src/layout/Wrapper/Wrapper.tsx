"use client";

import { ReactNode } from "react";
import styles from "./Wrapper.module.css";
import Footer from "../Footer/Footer";
import { Header } from "../Header/Header";
import AuthHeader from "../AuthHeader/AuthHeader";

type WrapperProps = {
  children: ReactNode;
  footerLarge?: boolean;
  blackHeader?: boolean;
  needHeader?: boolean;
};

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  footerLarge,
  blackHeader,
  needHeader = true,
}) => {
  return (
    <div className={styles.wrapper}>
      {needHeader ? <Header blackHeader={blackHeader} /> : <AuthHeader />}
      {children}
      <Footer size={footerLarge} />
    </div>
  );
};
