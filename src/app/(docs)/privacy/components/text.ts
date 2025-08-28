export interface Section {
  h1: string;
  paragraphs?: string[];
  list?: string[];
}

export const privacy_content: Section[] = [
  {
    h1: "1. Who We Are",
    paragraphs: [
      "“LOCORA” (“we”, “us”, “our”) provides an iOS app and website that surface essential city info, local tips, and travel stats.",
      "We act as the **data controller** for personal data processed via the app and site.",
    ],
  },
  {
    h1: "2. Data We Collect",
    list: [
      "**Account & profile (required):** Sign-in is passwordless via Email, Apple, Google, GitHub (OAuth identifiers and tokens). Profile includes display name/handle, avatar, interface language, home city, time zone.",
      "**User-generated content (UGC):** You can post text tips, comments, ratings. No geotags by default. Visibility is public by default. Do not share personal data in UGC. Moderation is via community reports + admin review.",
      "**Location data (iOS):** Precise and background location (if allowed by iOS) to trigger welcome messages when you arrive in a city and update travel statistics. You can disable in iOS Settings; some features won’t work without it.",
      "**Device, logs & site analytics:** Minimal technical logs (IP, timestamps, user-agent) for security and debugging. Website analytics via Google Analytics (with consent) and Vercel Analytics (cookieless). No in-app analytics/crash reporting currently.",
      "**Payments & notifications:** Payments only via Apple IAP (no card data stored). Push notifications via APNs; opt-out in app/iOS settings.",
    ],
  },
  {
    h1: "3. How We Use Data (Legal Bases)",
    paragraphs: ["We process data to:"],
    list: [
      "Provide the Service and core features (account, UGC, travel stats) — Contract.",
      "Show arrival/welcome experiences and maintain stats — Consent (location).",
      "Send notifications you enable — Consent (push).",
      "Secure and maintain the Service (fraud/abuse prevention, diagnostics) — Legitimate Interests.",
      "Website analytics — Consent (for GA; Vercel is cookieless).",
    ],
  },
  {
    h1: "4. Cookies & Similar Tech (Website)",
    list: [
      "Session cookies are essential for the site to function.",
      "Google Analytics loads only after consent (Consent Mode).",
      "Vercel Analytics runs cookieless.",
      "We honor Do Not Track (DNT) signals.",
    ],
  },
  {
    h1: "5. Sharing of Data",
    paragraphs: [
      "We **do not** sell personal data. We share data only with service providers:",
    ],
    list: [
      "Supabase (EU—Germany) — database, auth, storage (hosting and backups).",
      "Apple — IAP, APNs (push), and Sign in with Apple.",
      "Google — Google Sign-In OAuth; Google Analytics (site analytics, after consent).",
      "GitHub — OAuth (sign-in).",
      "These providers may process limited technical data (e.g., IP, tokens) to deliver their services.",
    ],
  },
  {
    h1: "6. International Transfers",
    paragraphs: [
      "Primary storage is in the EU (Germany) via Supabase.",
      "Some providers (Apple, Google, GitHub) may process data outside the EEA. We rely on safeguards such as **SCCs** or equivalent protections.",
    ],
  },
  {
    h1: "7. Retention & Deletion",
    list: [
      "Account & profile data / UGC: retained while account is active.",
      "Self-deletion: delete account instantly in-app; profile + UGC removed from production systems.",
      "Backups & logs: technical logs kept up to 30 days; backups roll off automatically.",
      "Aggregated, non-identifiable stats may be retained.",
    ],
  },
  {
    h1: "8. Your Choices & Rights",
    list: [
      "Access & update: edit profile details in-app.",
      "Portability: no structured export currently provided.",
      "Deletion: delete your account in-app anytime.",
      "Location & push: revoke permissions in iOS Settings.",
      "EEA/UK/California: we honor applicable rights (deletion, objection). We do not sell or share personal info as defined by CCPA/CPRA.",
    ],
  },
  {
    h1: "9. Children",
    paragraphs: [
      "The Service is not directed to children under 13.",
      "If you are in the EEA/UK and under 16, a parent/guardian must consent.",
      "If we learn we collected data from a child contrary to this section, we will delete it.",
    ],
  },
  {
    h1: "10. Security",
    paragraphs: [
      "We use TLS in transit; provider-level encryption at rest; access controls and least-privilege for staff; and routine monitoring. No method is 100% secure, but we take reasonable measures to protect your data.",
    ],
  },
  {
    h1: "11. User-Generated Content & Community Safety",
    paragraphs: [
      "UGC is public by default. You can report content for review. We may remove content or suspend accounts for spam, illegal, or harmful behavior, or to comply with law.",
    ],
  },
  {
    h1: "12. Third-Party Links",
    paragraphs: [
      "The app and site may link to external resources (e.g., transport, eSIM providers). We are not responsible for their privacy practices.",
    ],
  },
  {
    h1: "13. Changes to this Policy",
    paragraphs: [
      "We may update this Policy and update the effective date.",
      "Significant changes may be announced in-app or on Discord.",
    ],
  },
  {
    h1: "14. Contact",
    paragraphs: ["Questions or privacy requests: support@locora.app"],
  },
];
