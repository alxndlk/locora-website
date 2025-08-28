export interface Section {
  h1: string;
  paragraphs?: string[];
  list?: string[];
}

export const text_content: Section[] = [
  {
    h1: "1. About the Service & Beta Status",
    paragraphs: [
      `LOCORA is an iOS app with a companion website. Parts of the Service may be released as **beta** or **TestFlight** builds. Features may change, break, or be removed at any time, and data loss may occur. Use pre-release builds at your own risk.`,
    ],
  },
  {
    h1: "2. Eligibility & Accounts",
    list: [
      "You must be **13 or older** to use the Service. If you are under 18, use requires consent of a parent/guardian where required by law.",
      "One **personal account** per user. Do not sell, rent, or share your account.",
      "You agree to provide accurate information and to keep your device and sign-in tokens secure. You are responsible for all activity on your account.",
    ],
  },
  {
    h1: "3. Sign-in Methods",
    paragraphs: [
      "LOCORA uses **passwordless** sign-in via **Email, Apple, Google, and GitHub**. You authorize us to receive the basic OAuth identifiers needed to create and maintain your account.",
    ],
  },
  {
    h1: "4. Subscriptions, Lifetime & Payments (Apple IAP)",
    list: [
      "Purchases are handled **exclusively through Apple In-App Purchases**. We do not process or store payment card data.",
      "**Auto-renewing plans** (e.g., monthly/yearly) renew until canceled in your Apple ID settings. Cancel at least 24 hours before the billing date to avoid renewal.",
      "**Lifetime** is a **one-time payment**, non-transferable, tied to your Apple ID.",
      "**Refunds** are handled by **Apple** under Apple’s policies. LOCORA does not issue refunds directly.",
      "We may change prices or plan features prospectively. If your subscription renews, the new price may apply after prior notice from Apple or us.",
    ],
  },
  {
    h1: "5. Location Features & Disclaimer",
    paragraphs: [
      "With your permission, the app may use **precise** and **background** location to trigger welcome experiences when you arrive in a city and to build your travel statistics (cities, countries, days). **Location data** can be inaccurate and is not intended for safety-critical use (e.g., emergency, navigation, or legal compliance). Always verify critical information independently.",
    ],
  },
  {
    h1: "6. User Content (UGC) & Community Rules",
    paragraphs: [
      "You may submit content such as local tips, comments, and ratings (collectively “Content”). Do not include others’ personal data or any unlawful, harmful, misleading, or infringing material.",
    ],
    list: [
      "**License you grant to LOCORA**. You grant LOCORA a **worldwide, non-exclusive, royalty-free, sublicensable, and transferable license** to host, store, reproduce, modify (e.g., formatting), create derivative works (e.g., translations or layout changes), display, perform, and distribute your Content **in the Service and in promotional materials** (including screenshots, app store listings, social posts) to operate, promote, and improve the Service.",
      "**Public by default**. Content is public by default. Think before you post.",
      "**Moderation**. We may review, edit, hide, or remove Content at our discretion (e.g., spam, illegal content, harassment, misinformation, low-quality edits).",
      "After account deletion. If you delete your account, **your account and personal data are deleted immediately**, but **your posted Content may remain** (e.g., to preserve discussions or guides). Where reasonable, attribution may show as “Deleted user.”",
      "**Accuracy is not guaranteed**. Local tips and information may be incomplete or outdated.",
    ],
  },
  {
    h1: "7. Creator/Editing Plan",
    paragraphs: [
      "If your plan includes editing of public pages, you understand that:",
    ],
    list: [
      "LOCORA may **revert or adjust** any edits for accuracy, safety, legal, or quality reasons.",
      "**Attribution** to your username may appear on public edits and change histories.",
    ],
  },
  {
    h1: "8. Acceptable Use",
    paragraphs: ["You agree **not** to:"],
    list: [
      "violate laws or third-party rights;",
      "post or transmit illegal, abusive, harassing, hateful, or pornographic material;",
      "scrape, crawl, or use bots at a rate or in a manner that burdens the Service;",
      "reverse engineer, decompile, or attempt to access source code except as permitted by law;",
      "interfere with security or integrity (e.g., bypass controls, inject malware);",
      "use the Service for commercial purposes without our permission (other than your normal personal use).",
    ],
  },
  {
    h1: "9. Intellectual Property",
    paragraphs: [
      "The Service (including software, design, logos, text, and media) is owned by LOCORA or its licensors and protected by applicable laws. Except for the rights expressly granted to you in these Terms, **no rights are granted**. Your Content remains yours, subject to the license you grant us in Section 6.",
    ],
  },
  {
    h1: "10. Third-Party Services & Links",
    paragraphs: [
      "The Service may integrate with or link to third-party services (e.g., Apple IAP, sign-in providers). We are not responsible for third-party terms or practices. Your use of third-party services is at your own risk and subject to their terms.",
    ],
  },
  {
    h1: "11. Availability, Support & Changes",
    paragraphs: [
      "The Service is provided **without uptime guarantees**. Outages, maintenance windows, and changes may occur. Support is provided via **support@locora.app**. We may change or discontinue any feature at any time.",
    ],
  },
  {
    h1: "12. Termination",
    paragraphs: [
      "You may stop using the Service at any time and can delete your account in the app (see Privacy Policy). We may suspend or terminate access immediately for violations of these Terms, risk to users or to the Service, or where required by law.",
    ],
  },
  {
    h1: "13. Disclaimers",
    paragraphs: [
      "**TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE SERVICE IS PROVIDED “AS IS” AND “AS AVAILABLE,” WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING WITHOUT LIMITATION WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, ACCURACY, AVAILABILITY, NON-INFRINGEMENT, AND COURSE OF PERFORMANCE**. We do not warrant that tips, maps, lists, or other information are correct, complete, or safe for your specific use.",
    ],
  },
  {
    h1: "14. Limitation of Liability",
    paragraphs: [
      "**TO THE MAXIMUM EXTENT PERMITTED BY LAW, LOCORA AND ITS AFFILIATES, OFFICERS, EMPLOYEES, AND PARTNERS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF PROFITS, DATA, GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATING TO YOUR USE OF (OR INABILITY TO USE) THE SERVICE.** Where liability cannot be excluded under applicable law, **our aggregate liability** shall be limited to **the greater of (a) the total amount you paid for the Service in the 12 months preceding the claim, or (b) €10** for free-tier users.",
    ],
  },
  {
    h1: "15. Indemnification",
    paragraphs: [
      "**You agree to defend, indemnify, and hold harmless** LOCORA and its affiliates from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or in any way connected with your Content, your use of the Service, or your violation of these Terms or applicable law.",
    ],
  },
  {
    h1: "16. Governing Law & Dispute Resolution",
    paragraphs: [
      "These Terms and any dispute or claim (contractual or non-contractual) shall be **governed by the laws of Ukraine**, without regard to conflict-of-laws rules. You and LOCORA submit to the **jurisdiction of the courts of Ukraine**. Consumer-law rights that cannot be waived remain unaffected.",
    ],
  },
  {
    h1: "17. Changes to these Terms",
    paragraphs: [
      "We may update these Terms from time to time. We will post the new version on the site and/or in the app and update the effective date. **Material changes** may also be announced on Discord or in-app. Your continued use of the Service after changes become effective constitutes your acceptance.",
    ],
  },
  {
    h1: "18. Privacy",
    paragraphs: [
      "Your use of the Service is also governed by our **Privacy Policy** (see locora.app).",
    ],
  },
  {
    h1: "19. Contact",
    paragraphs: ["Questions about these Terms: support@locora.app"],
  },
];
