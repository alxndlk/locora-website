"use client";

import styles from "./Wrapper.module.css";
import Footer from "../Footer/Footer";
import AuthHeader from "../AuthHeader/RoutingHeader";
import { WrapperProps } from "@/lib/types/types";
import Header from "../Header/Header";

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  blackHeader,
  needHeader = true,
  footerTheme,
  headerText = "Locora for iOS",
}) => {
  return (
    <div className={styles.wrapper}>
      {needHeader ? (
        <Header blackHeader={blackHeader} headerText={headerText} />
      ) : (
        <AuthHeader />
      )}
      {children}
      <Footer theme={footerTheme} />
    </div>
  );
};
