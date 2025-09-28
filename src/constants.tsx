import { FiAlertCircle, FiCheckCircle, FiInfo } from "react-icons/fi";
import { links, socialLinks } from "./lib/nav";
import { FaqItem, SectionItem } from "./lib/types/types";

export const ICONS = {
  success: <FiCheckCircle aria-hidden />,
  error: <FiAlertCircle aria-hidden />,
  info: <FiInfo aria-hidden />,
} as const;

export const footerText = [
  "Locora is free to use. No subscription fees.",
  "A compatible device, the latest app version, and an internet connection may be required.",
  "Passwordless sign-in only. Use email login only if you’ve previously authenticated via a provider (e.g., Apple, Google, GitHub).",
  "Features and content may vary by region and are subject to change.",
  "Third-party services and integrations may require their own accounts and are subject to their terms.",
  "Network usage may incur data charges from your mobile or internet provider.",
  "Some features may require the latest OS updates and/or a stable internet connection.",
  `By using Locora you agree to the ${links.terms.name} and ${links.privacy.name}.`,
];

export const download_app_src: string = "/icons/download.png";

export const sections: SectionItem[] = [
  {
    title: "Shop and Learn",
    items: [
      { label: "Download", href: links.download.route },
      { label: "Changelog", href: links.changelog.route },
      { label: "Docs", href: links.docs.route },
      { label: "Blog", href: links.blog.route },
    ],
  },
  {
    title: "Account",
    items: [
      { label: "Profile", href: links.profile.route },
      { label: "Sign In", href: links.login.route },
      { label: "Privacy Policy", href: links.privacy.route },
      { label: "Terms of Service", href: links.terms.route },
    ],
  },
  {
    title: "Community",
    items: Object.values(socialLinks).map((s) => ({
      label: s.name,
      href: s.href,
      external: true,
    })),
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "mailto:support@locora.app", external: true },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
    ],
  },
];

export const faqs: FaqItem[] = [
  {
    q: "What is Locora?",
    a: "Locora is a lightweight travel companion that logs your trips, greets you when you arrive in a new city, and builds simple stats across devices. It focuses on clarity and privacy-first defaults — you decide what to share and when. The core experience is designed to be fast, distraction-free, and useful both during travel and after, when you review where you’ve been.",
  },
  {
    q: "Is Locora really free?",
    a: "Yes. The core app is free to download and use indefinitely. We may introduce optional add-ons (for example, advanced editing tools or premium data packs) as in-app purchases handled by the App Store. You can keep using the free version without buying anything, and any future purchases will be tied to your Apple ID.",
  },
  {
    q: "How does Beta / TestFlight work?",
    a: "TestFlight lets you try pre-release builds before they hit the App Store. Features in beta may change, be removed, or occasionally break; this helps us test performance and reliability across devices. Your feedback directly shapes what ships publicly, so early testers often see fixes and improvements land fastest.",
  },
  {
    q: "What data does Locora use for welcomes and stats?",
    a: "With your permission, Locora may use precise and background location to detect arrivals and compute city/country/day counts. Location is processed with power efficiency in mind and can be disabled at any time in iOS Settings → Privacy & Security → Location Services. If you turn location off, the app still works, but automatic welcomes and some stats won’t be available.",
  },
  {
    q: "Can I edit public pages?",
    a: "A Creator Plan is planned to allow edits to curated public pages (e.g., adding verified tips or improving city info). All payments for this plan, if/when launched, will be processed exclusively via the App Store, and attribution to your username may appear on public edits and histories. We reserve the right to review and revert changes for quality, safety, and accuracy.",
  },
];
