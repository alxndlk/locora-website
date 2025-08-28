"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Main.module.css";
import { GoArrowUpRight } from "react-icons/go";
import { motion, AnimatePresence } from "framer-motion";
import { FilterOptions } from "@/components/FilterOptions";
import General from "./General";
import SpinnerMask from "@/components/SpinnerMask/SpinnerMask";
import CityChanges from "./CityChanges";

/* ===================== Types ===================== */

type FullType = "Alpha" | "Beta" | "Release" | "City Changes";

export interface Section {
  h1: string;
  paragraphs?: string[];
  list?: string[];
}

export interface ChangelogFile {
  version: string;
  title: string;
  date: string;
  sections: Section[];
}

type ApiEntry = {
  key: string;
  type: string;
  size?: number;
  last_modified?: string;
  etag?: string;
  title?: string;
  version?: string;
  date?: string;
  html?: unknown;
  sections?: Section[];
  error?: string;
};

type ApiResponse = {
  bucket: string;
  prefix: string;
  count: number;
  entries: ApiEntry[];
};

/* ===================== Config ===================== */

const LAMBDA_BASE = process.env.NEXT_PUBLIC_LAMBDA_CHANGELOG || "";

const typeMap: Record<string, FullType> = {
  A: "Alpha",
  B: "Beta",
  R: "Release",
  C: "City Changes",
};

const FILTER_GROUPS = {
  All: ["Alpha", "Beta", "Release", "City Changes"] as FullType[],
  General: ["Alpha", "Beta", "Release"] as FullType[],
  "City Changes": ["City Changes"] as FullType[],
} as const;

type FilterKey = keyof typeof FILTER_GROUPS;

function isFilterKey(x: string): x is FilterKey {
  return Object.prototype.hasOwnProperty.call(FILTER_GROUPS, x);
}

/* ===================== Motion Variants ===================== */

const variant = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

/* ===================== Component ===================== */

const Main: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [entries, setEntries] = useState<ApiEntry[]>([]);
  const [currentFilter, setCurrentFilter] = useState<FilterKey>("All");
  const headingsRef = useRef<(HTMLHeadingElement | null)[]>([]);

  /* Подхватываем фильтр из URL при маунте */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const f = url.searchParams.get("filter");
    if (f && isFilterKey(f)) setCurrentFilter(f);
  }, []);

  /* Сохраняем фильтр в URL */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.set("filter", currentFilter);
    window.history.replaceState({}, "", url.toString());
  }, [currentFilter]);

  /* Загрузка данных */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(LAMBDA_BASE, { cache: "no-store" });
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const data: ApiResponse = await res.json();

        const sorted = [...(data.entries || [])].sort((a, b) => {
          const da =
            Date.parse((a.date || a.last_modified || "") as string) || 0;
          const db =
            Date.parse((b.date || b.last_modified || "") as string) || 0;
          return db - da;
        });

        setEntries(sorted);
      } catch (e: any) {
        setErr(e?.message || "Failed to load changelog");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const normalized = useMemo(() => {
    return entries.map((e) => {
      const rawType = String(e.type ?? "");
      const fullType: FullType =
        typeMap[rawType] ??
        (["Alpha", "Beta", "Release", "City Changes"].includes(rawType)
          ? (rawType as FullType)
          : "Release");

      const safeHtml = typeof e.html === "string" ? e.html : "";
      return { ...e, type: fullType, __html: safeHtml } as ApiEntry & {
        type: FullType;
        __html: string;
      };
    });
  }, [entries]);

  /* Счётчики по нормализованным данным */
  const counts = useMemo(() => {
    const result: Record<FilterKey, number> = {
      All: 0,
      General: 0,
      "City Changes": 0,
    };
    const all = normalized.length;
    const general = normalized.filter((e) =>
      FILTER_GROUPS.General.includes(e.type as FullType)
    ).length;
    const cities = normalized.filter((e) => e.type === "City Changes").length;

    result.All = all;
    result.General = general;
    result["City Changes"] = cities;

    return result;
  }, [normalized]);

  /* Фильтрация */
  const filtered = useMemo(() => {
    const key = isFilterKey(currentFilter) ? currentFilter : "All";
    const allow = FILTER_GROUPS[key];
    return normalized.filter((e) => allow.includes(e.type as FullType));
  }, [normalized, currentFilter]);

  return (
    <div className={styles.main}>
      {loading && <SpinnerMask backdrop={true} />}
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          variants={variant}
          initial="hidden"
          animate="visible"
        >
          <h1>Changelog</h1>
          <p>
            All notable changes to this project will be documented on this page.
          </p>
        </motion.div>

        {/* Фильтры */}
        <div
          className={styles.filters}
          role="tablist"
          aria-label="Changelog filters"
        >
          {FilterOptions.map((v, k) => {
            const name = v.name as string;
            const key: FilterKey = isFilterKey(name) ? name : "All";
            const active = currentFilter === key;
            const badge = counts[key] ?? 0;

            return (
              <button
                key={k}
                role="tab"
                aria-selected={active}
                tabIndex={active ? 0 : -1}
                onClick={() => setCurrentFilter(key)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setCurrentFilter(key);
                  }
                }}
                className={active ? styles.activeFilter : styles.filter}
              >
                {v.icon}
                <span className={styles.filterLabel}>{key}</span>
                <span className={styles.filterBadge}>{badge}</span>
              </button>
            );
          })}
        </div>

        {/* Контент */}
        <>
          {filtered.length === 0 && !loading && (
            <p className={styles.emptyState}>No entries for this filter yet.</p>
          )}

          <motion.div
            className={styles.changelogGrid}
            variants={variant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <AnimatePresence>
              {filtered.map((entry) =>
                entry.type !== "City Changes" ? (
                  <General
                    key={entry.key}
                    entry={entry}
                    styles={styles}
                    variant={variant}
                    headingsRef={headingsRef}
                  />
                ) : (
                  <CityChanges />
                )
              )}
            </AnimatePresence>
          </motion.div>
        </>
      </div>
    </div>
  );
};

export default Main;
