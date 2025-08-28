import { motion } from "framer-motion";
import React from "react";
import { GoArrowUpRight } from "react-icons/go";

type Section = {
  h1?: string;
  paragraphs?: string[];
  list?: string[];
};

type Entry = {
  key: string;
  type: string;
  title?: string;
  version?: string;
  date?: string;
  last_modified?: string;
  __html?: string;
  sections?: Section[];
};

interface GeneralProps {
  entry: Entry;
  styles: any;
  variant: any;
  headingsRef: React.MutableRefObject<(HTMLHeadingElement | null)[]>;
}

const General: React.FC<GeneralProps> = ({
  entry,
  styles,
  variant,
  headingsRef,
}) => {
  return (
    <motion.div
      key={entry.key}
      className={styles.card}
      variants={variant}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <header className={styles.cardHeader}>
        <div className={styles.row}>
          <div className={styles.type}>{entry.type.charAt(0)}</div>
          <div className={styles.column}>
            <div className={styles.cardTitle}>
              {entry.title || entry.key.replace(/^changelog\//, "")}
            </div>
            <div className={styles.cardMeta}>
              {entry.version && <span>v{entry.version}</span>}
              {(entry.date || entry.last_modified) && (
                <span>
                  {new Date(
                    (entry.date || entry.last_modified) as string
                  ).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  })}
                </span>
              )}
            </div>
          </div>
        </div>
        <motion.div
          className={styles.arrow}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 18,
          }}
          aria-hidden
        >
          <GoArrowUpRight />
        </motion.div>
      </header>

      {/* Тело карточки */}
      {entry.__html ? (
        <div
          className={styles.md}
          dangerouslySetInnerHTML={{ __html: entry.__html }}
        />
      ) : (
        <div className={styles.container_text}>
          {(entry.sections ?? []).map((section: Section, idx: number) => (
            <motion.div
              key={idx}
              className={styles.paragraph}
              variants={variant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {section.h1 && (
                <h2
                  id={`section-${idx}`}
                  ref={(el) => {
                    headingsRef.current[idx] = el;
                  }}
                  className={styles.heading}
                >
                  {section.h1}
                </h2>
              )}

              {section.paragraphs && (
                <div className={styles.paragraphs}>
                  {section.paragraphs.map((p, i) => (
                    <motion.p
                      key={i}
                      variants={variant}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      {p}
                    </motion.p>
                  ))}
                </div>
              )}

              {Array.isArray(section.list) && section.list.length > 0 && (
                <motion.ul
                  className={styles.tagList}
                  variants={variant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {section.list.map((item, i) => (
                    <motion.li
                      key={i}
                      className={styles.tag}
                      variants={variant}
                    >
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default General;
