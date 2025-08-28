"use client";

import React, { useState, useRef } from "react";
import styles from "./Main.module.css";
import { config } from "@/config";
import { text_content } from "./text";
import { FiCheck, FiLink } from "react-icons/fi";

const Main = () => {
  function HighlightedText({ text }: { text: string }) {
    const parts = text.split(/(\*\*.*?\*\*)/);
    return (
      <>
        {parts.map((part, i) =>
          part.startsWith("**") && part.endsWith("**") ? (
            <strong key={i}>{part.slice(2, -2)}</strong>
          ) : (
            part
          )
        )}
      </>
    );
  }

  const headingsRef = useRef<(HTMLHeadingElement | null)[]>([]);

  const CopyLinkButton = ({ idx }: { idx: number }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
      const link = `${window.location.origin}${window.location.pathname}#section-${idx}`;
      navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    };

    return (
      <button
        onClick={handleCopy}
        className={styles.anchor}
        aria-label="Copy link"
      >
        {copied ? <FiCheck color="green" /> : <FiLink />}
      </button>
    );
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.text}>
          <div className={styles.header}>
            <h1>Terms of Service</h1>
            <p>
              Last update: {config.terms_date_confirm.toLocaleDateString()}
              <br />
              Applies to: the LOCORA iOS application and the website locora.app
              (the “Service”).
              <br />
              Contact: support@locora.app
            </p>
          </div>

          <div className={styles.content}>
            <div className={styles.container_text}>
              {text_content.map((section, idx) => (
                <div key={idx} className={styles.paragraph}>
                  <h1
                    id={`section-${idx}`}
                    ref={(el) => {
                      headingsRef.current[idx] = el;
                    }}
                    className={styles.heading}
                  >
                    {section.h1}
                    <CopyLinkButton idx={idx} />
                  </h1>

                  {section.paragraphs?.map((p, i) => (
                    <p key={i}>
                      <HighlightedText text={p} />
                    </p>
                  ))}

                  {section.list && (
                    <ul className={styles.list}>
                      {section.list?.map((item, i) => (
                        <li key={i}>
                          <HighlightedText text={item} />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
