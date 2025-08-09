"use client";

import React from "react";
import styles from "./Main.module.css";
import Image from "next/image";
import { links } from "@/lib/nav";
import { PrimaryButton } from "@/ui/PrimaryButton";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import { motion } from "framer-motion";
import { signup } from "@/lib/auth-actions";

const Main = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15,
      },
    },
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <motion.section className={styles.main} initial="hidden" animate="visible">
      <div className={styles.container}>
        <motion.div className={styles.holder} variants={containerVariants}>
          <div className={styles.light} />
          <div className={styles.image_holder}>
            <Image
              alt=""
              src={"/images/logo-white.png"}
              width={512}
              height={512}
              className={styles.icon}
            />
          </div>
          <h3>Create new account</h3>
          <form className={styles.input} onSubmit={onSubmit}>
            <p>Email</p>
            <input
              type="email"
              placeholder="example@email.com"
              required
              name="email"
            />
            <PrimaryButton
              text="CREATE ACCOUNT"
              fontSize={15}
              iconPosition="left"
              icon="GoArrowUpRight"
              iconSize={20}
              fontWeight={500}
              paddingButton="14.25px 24px"
              formAction={signup}
            />
          </form>
          <div className={styles.or}>
            <span></span>
            <h1>OR</h1>
            <span></span>
          </div>
          <div className={styles.buttons}>
            <button>
              <div className={styles.light} />
              <FaGoogle size={16} />
              Sign up with Google
            </button>
            <button>
              <div className={styles.light} />
              <FaGithub size={16} />
              Sign up with GitHub
            </button>
          </div>
        </motion.div>
        <div className={styles.span}>
          <span>Don&apos;t have an account? </span>
          <a href={links.login.route}>{links.login.name}</a>
        </div>
      </div>
    </motion.section>
  );
};

export default Main;
