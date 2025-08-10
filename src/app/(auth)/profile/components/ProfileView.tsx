"use client";

import Image from "next/image";
import styles from "./ProfileView.module.css";
import { useEffect, useState } from "react";
import { VscVerifiedFilled } from "react-icons/vsc";
import { GiAchievement } from "react-icons/gi";
import { RxInfoCircled } from "react-icons/rx";
import { signout } from "@/lib/auth-actions";
import { links } from "@/lib/nav";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MdOutlineLogout } from "react-icons/md";
import Spinner from "@/ui/Spinner";
import { useFormStatus } from "react-dom";

export type Trip = {
  id: string;
  city: string;
  country: string;
  dateFrom: string;
  dateTo?: string;
  coverUrl?: string;
};

export type Badge = {
  id: string;
  emoji?: string;
  color?: string;
};

export type ProfileViewProps = {
  name: string;
  username?: string;
  email?: string;
  avatarUrl?: string;
  memberSince?: string;
  bio?: string;

  totalTrips: number;
  countries: number;
  cities: number;
  daysOnRoad: number;

  recentTrips: Trip[];
  badges: Badge[];

  editHref?: string;
  exportHref?: string;
  privacyHref?: string;
};

const SettingOptions = [
  { name: "General", icon: "" },
  { name: "Plan", icon: "" },
];

export default function ProfileView({
  name,
  email,
  avatarUrl = "/images/avatar-fallback.png",
  badges,
}: ProfileViewProps) {
  const [bg, setBg] = useState<string>("");
  const [currentOption, setcurrentOption] = useState<number>(0);

  const router = useRouter();

  useEffect(() => {
    const randomNum = Math.floor(Math.random() * 15) + 1;
    setBg(`/profile_bgs/${randomNum}.jpg`);
    console.log(bg);
  }, []);

  return (
    <div className={styles.wrap}>
      <div
        className={styles.bg_wrapper}
        style={bg ? { backgroundImage: `url(${bg})` } : undefined}
      />
      <section className={styles.headerCard}>
        <div className={styles.container}>
          <div className={styles.avatarWrap}>
            <Image
              src={avatarUrl}
              alt={`${name} avatar`}
              width={160}
              height={160}
              className={styles.avatar}
              priority
            />
            <div className={styles.plan}>Free Plan</div>
          </div>

          <div className={styles.identity}>
            <div className={styles.user}>
              {name && <h1 className={styles.name}>{name}</h1>}
              {email && (
                <span className={styles.email}>
                  {email}
                  <VscVerifiedFilled color="#007aff" />
                </span>
              )}
            </div>

            {!!badges?.length && (
              <div className={styles.badges}>
                {badges.slice(0, 12).map((b, i) => (
                  <span
                    key={b.id}
                    className={styles.badge}
                    style={{
                      background: b.color || undefined,
                      zIndex: badges.length - i,
                    }}
                  >
                    {b.emoji && (
                      <span className={styles.badgeEmoji}>{b.emoji}</span>
                    )}
                  </span>
                ))}
              </div>
            )}
            <span className={styles.unlock}>
              <GiAchievement />
              You unlock {badges.length} of 123 achievements
            </span>
          </div>
        </div>
      </section>
      <section className={styles.rest}>
        <div className={styles.container_rest}>
          <div className={styles.info}>
            <div className={styles.icon}>
              <RxInfoCircled color="rgb(0, 112, 201)" className={styles.icon} />
            </div>

            <div className={styles.text_rest}>
              <h2>Возрастные ограничения изменились</h2>
              <span>
                Apple представила обновленную, более детальную систему
                возрастных ограничений с новыми вопросами для их определения.
                Существующие возрастные ограничения приложений были
                автоматически скорректированы в соответствии с нашей обновленной
                системой. Просмотреть скорректированные возрастные ограничения и
                ответить на новые вопросы о них можно в разделе информации
                каждого приложения.
              </span>
            </div>
          </div>
          <div className={styles.header}>
            <ul className={styles.ul}>
              {SettingOptions.map((value, key) => (
                <li
                  key={key}
                  className={currentOption == key ? styles.active : ""}
                  onClick={() => {
                    setcurrentOption(key);
                  }}
                >
                  {value.name}
                </li>
              ))}
            </ul>
            <button
              className={styles.signout}
              onClick={async () => {
                await signout();
                router.push(links.login.route);
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ title, value }: { title: string; value: number | string }) {
  return (
    <div className={styles.stat}>
      <div className={styles.statValue}>{value}</div>
      <div className={styles.statTitle}>{title}</div>
    </div>
  );
}

function formatRange(fromIso: string, toIso?: string) {
  const opts: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  const from = new Date(fromIso).toLocaleDateString(undefined, opts);
  if (!toIso) return from;
  const to = new Date(toIso).toLocaleDateString(undefined, opts);
  return `${from} — ${to}`;
}
