/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import styles from "./ProfileView.module.css";
import { useEffect, useRef, useState } from "react";
import { VscVerifiedFilled } from "react-icons/vsc";
import { GiAchievement } from "react-icons/gi";
import { RxInfoCircled } from "react-icons/rx";
import { signout } from "@/lib/auth-actions";
import { links } from "@/lib/nav";
import { useRouter } from "next/navigation";

import { SettingsOptions } from "@/components/SettingsOptions";
import { Segmented } from "@/components/SelectOption";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import SpinnerMask from "@/components/SpinnerMask/SpinnerMask";

import type {
  CurrencyCode,
  Prefs,
  ProfileViewProps,
  TempUnit,
  TimeFmt,
} from "../../../../../types";
import { updateUserPrefs } from "@/app/actions/update-user-prefs";
import { grantAchievement } from "@/app/actions/grant-achievement";
import { MdOutlineLogout } from "react-icons/md";
import "flag-icons/css/flag-icons.min.css";
import AvatarUploader from "@/components/AvatarUploader";

type Props = ProfileViewProps & {
  initialPrefs: Prefs;
};

export default function ProfileView({
  name,
  email,
  avatarUrl = "/images/default-avatar.png",
  achievements,
  totalAchiements,
  memberSince,
  countries,
  cities,
  initialPrefs,
}: Props) {
  const [currentOption, setcurrentOption] = useState<number>(0);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    currentTemperature,
    setCurrentTemperature,
    currentTimeFormat,
    setCurrentTimeFormat,
    currentCurrency,
    setCurrentCurrency,
  } = useUserPreferences(
    initialPrefs.currency ?? "USD",
    initialPrefs.temp_unit ?? "C",
    initialPrefs.time_fmt ?? "24"
  );

  type PrefKey = keyof Prefs;

  const timersRef = useRef<
    Partial<Record<PrefKey, ReturnType<typeof setTimeout>>>
  >({});
  const latestRef = useRef<{
    currency: CurrencyCode;
    temp_unit: TempUnit;
    time_fmt: TimeFmt;
  }>({
    currency: currentCurrency,
    temp_unit: currentTemperature,
    time_fmt: currentTimeFormat,
  });

  useEffect(() => {
    latestRef.current.currency = currentCurrency;
  }, [currentCurrency]);
  useEffect(() => {
    latestRef.current.temp_unit = currentTemperature;
  }, [currentTemperature]);
  useEffect(() => {
    latestRef.current.time_fmt = currentTimeFormat;
  }, [currentTimeFormat]);

  const scheduleSave = (key: PrefKey, delay = 350) => {
    const t = timersRef.current[key];
    if (t) clearTimeout(t);

    timersRef.current[key] = setTimeout(async () => {
      setLoading(true);
      await grantAchievement("update_preferences");
      try {
        await updateUserPrefs({ [key]: latestRef.current[key] } as Prefs);
      } finally {
        setLoading(false);
      }
    }, delay);
  };

  useEffect(() => {
    return () => {
      const timers = { ...timersRef.current };
      Object.values(timers).forEach((t) => t && clearTimeout(t));
    };
  }, []);

  function renderPanel() {
    switch (currentOption) {
      case 0:
        return (
          <div className={styles.panel}>
            {loading && <SpinnerMask backdrop={false} />}
            <ul className={styles.kv}>
              <li>
                <span>Name</span>
                <h2>{name || "—"}</h2>
              </li>

              <li>
                <span>Email</span>
                <h2>
                  {email || "—"} <VscVerifiedFilled color="#007aff" size={18} />
                </h2>
              </li>

              <li>
                <span>Member since</span>
                <h2>
                  {memberSince ? new Date(memberSince).toDateString() : "—"}
                </h2>
              </li>

              <li>
                <span>Currency</span>
                <Segmented<CurrencyCode>
                  value={currentCurrency}
                  onChange={(v) => {
                    setCurrentCurrency(v);
                    scheduleSave("currency");
                  }}
                  options={[
                    { value: "USD", label: "USD" },
                    { value: "EUR", label: "EUR" },
                    { value: "AUD", label: "AUD" },
                    { value: "GBP", label: "GBP" },
                    { value: "JPY", label: "JPY" },
                    { value: "CZK", label: "CZK" },
                    { value: "UAH", label: "UAH" },
                  ]}
                />
              </li>

              <li>
                <span>Temperature</span>
                <Segmented<TempUnit>
                  value={currentTemperature}
                  onChange={(v) => {
                    setCurrentTemperature(v);
                    scheduleSave("temp_unit");
                  }}
                  options={[
                    { value: "C", label: "°C — Celsius" },
                    { value: "F", label: "°F — Fahrenheit" },
                  ]}
                />
              </li>

              <li>
                <span>Time Format</span>
                <Segmented<TimeFmt>
                  value={currentTimeFormat}
                  onChange={(v) => {
                    setCurrentTimeFormat(v);
                    scheduleSave("time_fmt");
                  }}
                  options={[
                    { value: "12", label: "12‑hour" },
                    { value: "24", label: "24‑hour" },
                  ]}
                />
              </li>
            </ul>
          </div>
        );

      case 1:
        return (
          <div className={styles.panel}>
            {achievements.length === 0 ? (
              <p className={styles.muted}>No achievements yet.</p>
            ) : (
              <div className={styles.achGrid}>
                {achievements.map((a) => (
                  <div key={a.id} className={styles.achCard}>
                    <div
                      className={styles.achIcon}
                      style={{ background: a.color }}
                    >
                      {a.emoji}
                    </div>
                    <div className={styles.achBody}>
                      <div className={styles.achTitle}>{a.label}</div>
                      {a.description && (
                        <div className={styles.achDesc}>{a.description}</div>
                      )}
                      {a.achieved_at && (
                        <div className={styles.achDate}>
                          Earned: {new Date(a.achieved_at).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 2: // Countries
        return (
          <div className={styles.panel}>
            {countries.length === 0 ? (
              <p className={styles.muted}>No countries visited yet.</p>
            ) : (
              <div className={styles.achGrid}>
                {countries.map((country) => (
                  <div key={country.country_code} className={styles.achCard}>
                    {window.navigator.platform.startsWith("Win") ? (
                      <div className={styles.achFlag}>
                        <span
                          className={`fi fi-${country.country_code.toLowerCase()}`}
                        />
                      </div>
                    ) : (
                      <div className={styles.achIcon}>
                        <span>{country.country_flag}</span>
                      </div>
                    )}

                    <div className={styles.achBody}>
                      <div className={styles.achTitle}>
                        {country.country_name}, {country.country_code}
                      </div>
                      {country.visited_at && (
                        <div className={styles.achDate}>
                          Visited:{" "}
                          {new Date(country.visited_at).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 3: // Cities
        return (
          <div className={styles.panel}>
            {cities.length === 0 ? (
              <p className={styles.muted}>No cities visited yet.</p>
            ) : (
              <div className={styles.achGrid}>
                {cities.map((city) => (
                  <div key={city.id} className={styles.achCard}>
                    {window.navigator.platform.startsWith("Win") ? (
                      <div className={styles.achFlag}>
                        <span
                          className={`fi fi-${city.country_code.toLowerCase()}`}
                        />
                      </div>
                    ) : (
                      <div className={styles.achIcon}>
                        <span>{city.country_flag}</span>
                      </div>
                    )}
                    <div className={styles.achBody}>
                      <div className={styles.achTitle}>{city.city_name}</div>
                      {city.country_name && city.country_code && (
                        <div className={styles.achDesc}>
                          {city.country_name}, {city.country_code}
                        </div>
                      )}
                      {city.visited_at && (
                        <div className={styles.achDate}>
                          Visited:{" "}
                          {new Date(city.visited_at).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.bg_wrapper} />
      <section className={styles.headerCard}>
        <div className={styles.container}>
          <div className={styles.avatarWrap}>
            <AvatarUploader avatarUrl={avatarUrl} name={name} />
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

            {!!achievements?.length && (
              <div className={styles.badges}>
                {achievements.slice(0, 12).map((a, i) => (
                  <span
                    key={a.id}
                    className={styles.badge}
                    style={{
                      background: a.color || undefined,
                      zIndex: achievements.length - i,
                    }}
                  >
                    {a.emoji && (
                      <span className={styles.badgeEmoji}>{a.emoji}</span>
                    )}
                  </span>
                ))}
              </div>
            )}
            <span className={styles.unlock}>
              <GiAchievement />
              You unlock {achievements.length} of {totalAchiements} achievements
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
              <h2>Profile Information</h2>
              <span>
                View and update your profile details, preferences, achievements,
                and travel history. Changes to preferences are saved
                automatically. Your profile shows your name, email and avatar.
                You can select your preferred currency, temperature unit, and
                time format. Achievements appear here, and you can track your
                progress. The travel history section lists countries and cities
                you&apos;ve visited. Use the options above to switch views. To
                update your avatar, click your profile image. All updates are
                saved securely. Sign out anytime using the button below.
              </span>
            </div>
          </div>
          <div className={styles.header}>
            <ul className={styles.ul}>
              {SettingsOptions.map((value, key) => (
                <li
                  key={key}
                  className={currentOption == key ? styles.active : ""}
                  onClick={() => {
                    setcurrentOption(key);
                  }}
                >
                  <div className={styles.icon_holder}>{value.icon}</div>
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
              <MdOutlineLogout />
              Sign Out
            </button>
          </div>
          <div className={styles.panelArea}>{renderPanel()}</div>
        </div>
      </section>
    </div>
  );
}
