import { FiAlertCircle, FiCheckCircle, FiInfo } from "react-icons/fi";
import { links, socialLinks } from "./lib/nav";
import { SectionItem } from "./lib/types/types";

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
