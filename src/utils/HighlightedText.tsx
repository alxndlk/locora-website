import React from "react";

export function HighlightedText({ text }: { text: string }) {
  const mdLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;

  type Token =
    | { type: "text"; value: string }
    | { type: "bold"; value: string }
    | { type: "link"; label: string; href: string }
    | { type: "url"; value: string; href: string }
    | { type: "email"; value: string; href: string };

  const tokens: Token[] = [];
  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = mdLinkRegex.exec(text)) !== null) {
    if (m.index > last)
      tokens.push({ type: "text", value: text.slice(last, m.index) });
    tokens.push({ type: "link", label: m[1], href: m[2] });
    last = mdLinkRegex.lastIndex;
  }
  if (last < text.length)
    tokens.push({ type: "text", value: text.slice(last) });

  const urlRegex = /\b((?:https?:\/\/|www\.)[^\s<)]+)\b/gi;
  const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;

  function processTextSegment(segment: string): Token[] {
    const parts = segment.split(/(\*\*.*?\*\*)/);
    const out: Token[] = [];

    for (const part of parts) {
      if (!part) continue;

      if (part.startsWith("**") && part.endsWith("**")) {
        out.push({ type: "bold", value: part.slice(2, -2) });
        continue;
      }

      let idx = 0;
      const combined = new RegExp(
        `${urlRegex.source}|${emailRegex.source}`,
        "gi"
      );
      let mm: RegExpExecArray | null;

      while ((mm = combined.exec(part)) !== null) {
        if (mm.index > idx)
          out.push({ type: "text", value: part.slice(idx, mm.index) });

        const found = mm[0];
        if (/^https?:\/\//i.test(found) || /^www\./i.test(found)) {
          const href = /^www\./i.test(found) ? `https://${found}` : found;
          out.push({ type: "url", value: found, href });
        } else {
          out.push({ type: "email", value: found, href: `mailto:${found}` });
        }
        idx = mm.index + found.length;
      }
      if (idx < part.length) out.push({ type: "text", value: part.slice(idx) });
    }
    return out;
  }

  const flat: Token[] = tokens.flatMap((t) =>
    t.type === "text" ? processTextSegment(t.value) : [t]
  );

  return (
    <>
      {flat.map((t, i) => {
        switch (t.type) {
          case "bold":
            return <strong key={i}>{t.value}</strong>;
          case "link":
            return (
              <a
                key={i}
                href={t.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.label}
              </a>
            );
          case "url":
            return (
              <a
                key={i}
                href={t.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.value}
              </a>
            );
          case "email":
            return (
              <a key={i} href={t.href}>
                {t.value}
              </a>
            );
          default:
            return <React.Fragment key={i}>{t.value}</React.Fragment>;
        }
      })}
    </>
  );
}
