"use client";

import React from "react";
import styles from "./SignoutButton.module.css";
import { MdOutlineLogout } from "react-icons/md";
import { useFormStatus } from "react-dom";
import Spinner from "@/app/components/ui/Spinner/Spinner";

const SignoutButton: React.FC = () => {
  const { pending } = useFormStatus();

  return (
    <>
      <button type="submit" className={styles.signout} disabled={pending}>
        <div className={styles.icon}>
          <MdOutlineLogout size={18} />
        </div>
        <div className={styles.primary}>
          {pending ? "Signing out…" : "Sign Out"}
          <div className={styles.secondary}>
            {pending ? "Please wait" : "We will miss you! 🥲"}
          </div>
        </div>
      </button>
      {pending && <Spinner size={24} />}
    </>
  );
};

export default React.memo(SignoutButton);
