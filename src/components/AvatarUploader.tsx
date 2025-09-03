/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Styles.module.css";
import Spinner from "@/ui/Spinner";
import { useProfile } from "../context/ProfileContext";
import { FaPen } from "react-icons/fa6";

export default function AvatarUploader({
  avatarUrl,
  name,
}: {
  avatarUrl?: string;
  name: string;
}) {
  const [currentUrl, setCurrentUrl] = useState(avatarUrl);
  const [uploading, setUploading] = useState(false);

  const { profile, loading, setProfile } = useProfile();

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);

    try {
      const res = await fetch("/api/upload-avatar", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.url) {
        setCurrentUrl(data.url);
        if (profile) {
          setProfile({ ...profile, avatar_url: data.url });
        }
      }
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div
      className={styles.avatarWrapper}
      onClick={() => document.getElementById("avatarInput")?.click()}
    >
      {loading ? (
        <div className={styles.spinnerWrapper}>
          <Spinner size={64} />
        </div>
      ) : (
        <Image
          src={profile?.avatar_url || "/images/default-avatar.png"}
          alt={`${name} avatar`}
          width={200}
          height={200}
          className={styles.avatarImage}
          unoptimized
        />
      )}

      <div className={styles.avatarOverlay}>
        {uploading ? (
          <Spinner color="#fff" />
        ) : (
          <>
            <FaPen style={{ marginRight: "0.5rem" }} />
            Edit
            <input
              id="avatarInput"
              type="file"
              accept="image/png,image/jpeg,image/gif,image/avif,image/apng"
              style={{ display: "none" }}
              className={styles.input}
              onChange={handleFileChange}
            />
          </>
        )}
      </div>
    </div>
  );
}
