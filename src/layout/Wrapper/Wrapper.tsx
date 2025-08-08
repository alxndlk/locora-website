"use client";

import { ReactNode, useEffect, useState } from "react";
import styles from "./Wrapper.module.css";
import Footer from "../Footer/Footer";
import { Header } from "../Header/Header";

type WrapperProps = {
  children: ReactNode;
};

export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = (scrollTop / docHeight) * 100;
      setProgress(scrollProgress);
    };

    updateProgress();

    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.line} style={{ width: `${progress}%` }} />
      {children}
      <Footer />
    </div>
  );
};
