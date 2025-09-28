export interface Section {
  h1: string;
  paragraphs?: string[];
  list?: string[];
}

export const privacy_content: Section[] = [
  {
    h1: "Who We Are",
    paragraphs: [
      "“LOCORA” (“we”, “us”, “our”) provides an iOS app and companion website that surface essential city info, local tips, and travel stats for travelers and locals.",
      "For purposes of EU/UK data protection laws, LOCORA is the **data controller** for personal data processed via the app and site. Where we rely on third-party providers (processors), they act on our documented instructions.",
      "You can contact us at **support@locora.app** regarding this Policy or your privacy rights.",
    ],
  },

  {
    h1: "Data We Collect",
    paragraphs: [
      "We strive to collect only what is necessary (“data minimization”). Categories include:",
    ],
    list: [
      "**Account & profile (required):** Passwordless sign-in via **Email, Apple, Google, GitHub** (OAuth identifiers/tokens). Profile may include display name/handle, avatar, interface language, home city, and time zone.",
      "**User-generated content (UGC):** Text tips, comments, ratings. **No geotags by default.** UGC is **public by default**. Do not include personal data of others.",
      "**Location data (iOS):** With your consent, **precise** and **background** location to trigger arrival/welcome experiences and update travel statistics (cities, countries, days). You can disable in iOS Settings; some features will not work without it.",
      "**Device, logs & diagnostics:** Minimal technical logs (IP, timestamps, user-agent, error traces) to secure and maintain the Service and to investigate abuse.",
      "**Website analytics:** **Google Analytics** (loads only after consent; Consent Mode) and **Vercel Analytics** (cookieless).",
      "**Payments & notifications:** **All future purchases via Apple IAP** (we do not store card data). Push notifications via **APNs**; you can opt out in-app or in iOS Settings.",
    ],
  },

  {
    h1: "How We Use Data (Legal Bases)",
    paragraphs: [
      "We process personal data under the following legal bases (Art. 6 GDPR):",
    ],
    list: [
      "**Contract:** Provide and maintain the Service (accounts, UGC, core features), respond to support requests.",
      "**Consent:** Location (arrival/welcome, travel stats); push notifications; web analytics via GA. You may withdraw consent at any time in iOS Settings or cookie banner—withdrawal does not affect prior processing.",
      "**Legitimate Interests:** Security, fraud/abuse prevention, diagnostics, service quality; minimal operational telemetry on web (Vercel cookieless). We conduct balancing tests for these interests.",
      "**Legal Obligations:** Respond to lawful requests, enforce rights, comply with tax/consumer/node retention duties where applicable.",
    ],
  },

  {
    h1: "Cookies & Similar Tech (Website)",
    list: [
      "**Essential cookies:** Required for core site functionality and security.",
      "**Analytics:** **Google Analytics** loads **only after consent** (Consent Mode); **Vercel Analytics** operates **cookieless**.",
      "**DNT/Global Privacy Control:** We endeavor to honor **Do Not Track** and **GPC** signals where technically feasible.",
      "You can adjust consent in the site’s cookie banner/preferences at any time.",
    ],
  },

  {
    h1: "Sharing of Data (Processors & Partners)",
    paragraphs: [
      "We **do not sell** personal data. We share data only with service providers acting under contracts that include confidentiality, security, and **Standard Contractual Clauses** (where applicable).",
    ],
    list: [
      "**Supabase (EU—Germany):** database, auth, storage (hosting/backups).",
      "**Apple:** App Store / **In-App Purchases** (merchant of record), **APNs** (push), **Sign in with Apple**.",
      "**Google:** Google Sign-In OAuth; **Google Analytics** (web analytics after consent).",
      "**GitHub:** OAuth (sign-in).",
      "Providers may process limited technical data (e.g., IP, tokens) **solely** to deliver their services.",
    ],
  },

  {
    h1: "International Transfers",
    paragraphs: [
      "Primary data storage is in the **EU (Germany)** via Supabase. Some providers (Apple, Google, GitHub) may process data outside the EEA/UK (e.g., U.S.).",
      "Where required, we rely on **appropriate safeguards** such as **EU Standard Contractual Clauses (SCCs)** and implement supplementary measures where suitable.",
    ],
  },

  {
    h1: "Retention & Deletion",
    paragraphs: [
      "We retain data only as long as necessary for the purposes described or as required by law.",
    ],
    list: [
      "**Account & profile:** kept while your account remains active.",
      "**Self-deletion:** you can **delete your account in-app** at any time; we remove your account and personal data from production systems.",
      "**UGC after deletion:** to preserve public discussions/guides, **UGC may remain public**; where reasonable, attribution shows **“Deleted user.”**",
      "**Backups & logs:** technical logs up to **30 days**; backups roll off automatically on a rotating schedule.",
      "**Aggregates:** we may retain **aggregated/de-identified** statistics for analytics and product improvement.",
    ],
  },

  {
    h1: "Your Choices & Rights",
    paragraphs: ["Your controls and rights include (subject to local law):"],
    list: [
      "**Access/Correction:** view and edit profile **in-app**; contact us for additional access/correction where required by law.",
      "**Deletion:** delete your account **in-app** at any time.",
      "**Portability:** upon request, we provide an export where legally required.",
      "**Objection/Restriction:** you may object to certain processing (e.g., legitimate interests) or request restriction where grounds apply.",
      "**Consent Withdrawal:** revoke **Location** and **Push** in iOS Settings; adjust **cookie/analytics** consent in the banner.",
      "**EEA/UK:** you may lodge a complaint with your supervisory authority.",
      "**California (CCPA/CPRA):** we **do not sell or share** personal information as defined by CPRA; you may exercise applicable rights by contacting **support@locora.app**.",
    ],
  },

  {
    h1: "Children",
    paragraphs: [
      "The Service is **not directed to children under 13**. In the EEA/UK, if you are under **16**, parental/guardian consent is required (or higher local age where applicable). If we learn we collected data contrary to this section, we will delete it.",
    ],
  },

  {
    h1: "Security",
    paragraphs: [
      "We apply reasonable technical and organizational measures: **TLS in transit**, provider-level **encryption at rest**, access controls, least-privilege for staff, periodic reviews and monitoring. No method is 100% secure, but we take steps appropriate to our role to protect your data.",
    ],
  },

  {
    h1: "User-Generated Content & Community Safety",
    paragraphs: [
      "UGC is **public by default**. You can report content for review. We may remove content or suspend accounts for spam, illegal, or harmful behavior, or to comply with law and protect users.",
    ],
  },

  {
    h1: "Marketing & Communications",
    paragraphs: [
      "We do **not** send marketing emails by default. If we introduce optional newsletters or promotional messages, we will obtain your **consent** (opt-in) where required and provide an **unsubscribe** option. Transactional/service messages (e.g., account, legal notices) may be sent without marketing consent.",
    ],
  },

  {
    h1: "Automated Decision-Making & Profiling",
    paragraphs: [
      "We do **not** engage in automated decision-making that produces legal or similarly significant effects on you. We do not conduct behavioral advertising profiling within the app.",
    ],
  },

  {
    h1: "Third-Party Links",
    paragraphs: [
      "The app and site may link to external resources (e.g., transport, eSIM providers). We are not responsible for their privacy practices or content. Review their policies before using those services.",
    ],
  },

  {
    h1: "Data Subject Requests (How to Exercise)",
    paragraphs: [
      "To exercise your rights, contact **support@locora.app** with sufficient detail to identify you and your request. We may need to verify your identity before acting. We aim to respond within one month (GDPR) or the timeframe required by your local law.",
    ],
  },

  {
    h1: "Incident Response",
    paragraphs: [
      "If we become aware of a personal data breach, we will assess the risk and, where required by law, notify the relevant supervisory authority and affected users within the applicable timeframes.",
    ],
  },

  {
    h1: "Changes to this Policy",
    paragraphs: [
      "We may update this Policy periodically and update the effective date. **Significant changes** may be announced in-app, on our website, or via community channels.",
    ],
  },

  {
    h1: "Feedback & Information",
    paragraphs: [
      "Any feedback you provide through the Service or our channels shall be deemed non-confidential, and Locora may use such information on an unrestricted basis. The information contained in this app and on our website is subject to change without notice. Copyright © 2025 Locora. All rights reserved. Contact: support@locora.app. Website: [locora.app](https://locora.app). Updated by the Locora Legal Team on Sep. 28, 2025.",
    ],
  },
];
