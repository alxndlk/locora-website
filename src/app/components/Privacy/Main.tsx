"use client";

import React, { useState, useRef } from "react";
import styles from "./Main.module.css";
import { FiCheck, FiLink } from "react-icons/fi";
import { HighlightedText } from "@/utils/HighlightedText";
import { privacy_content } from "@/app/(docs)/privacy/text";

const Main = () => {
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
            <h1>Locora Privacy Policy</h1>
            <p>
              Locora is committed to your privacy. Read this Privacy Policy for
              a clear explanation of how we collect, use, disclose, transfer,
              and store your information.
              <br />
              <br /> To access and manage your Locora data, open{" "}
              <strong>Settings → Privacy</strong> in the app or visit{" "}
              <a
                href="https://locora.app/profile"
                target="_blank"
                rel="noopener noreferrer"
              >
                Manage your account
              </a>
              . For corrections or general enquiries, please contact
              <a href="mailto:support@locora.app"> support@locora.app</a>.
            </p>
          </div>

          <div className={styles.content}>
            <div className={styles.container_text}>
              {privacy_content.map((section, idx) => (
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
