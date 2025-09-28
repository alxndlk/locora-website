import { FaXTwitter, FaGithub, FaReddit, FaDiscord } from "react-icons/fa6";
import { LinkItem, NavigationHeaderLinks, Section } from "./types/types";

export const links = {
  home: { name: "Home", route: "/", description: "Go to the homepage" },
  login: {
    name: "Sign In",
    route: "/login",
    label: "Authentication",
    description: "Log in to your account",
  },
  download: {
    name: "Download",
    route: "/download",
    label: "Download",
    description: "Download our app",
  },
  changelog: {
    name: "Changelog",
    route: "/changelog",
    label: "Changelog",
    description: "View latest updates",
  },
  docs: {
    name: "Documentation",
    route: "/docs",
    label: "Documentation",
    description: "Read the documentation",
  },
  blog: {
    name: "Blog",
    route: "/blog",
    label: "Blog",
    description: "Read our latest articles",
  },
  terms: {
    name: "Terms of Service",
    route: "/terms",
    label: "Terms of Service",
    description: "Review the rules and conditions for using our services",
  },
  privacy: {
    name: "Privacy Policy",
    route: "/privacy",
    label: "Privacy Policy",
    description: "Learn how we collect, use, and protect your information",
  },
  profile: {
    name: "Profile",
    route: "/profile",
    label: "Profile",
    description: "Get and manage information about your account.",
  },
};

export const socialLinks = {
  x: {
    name: "Twitter / X",
    href: "https://x.com/locora_app",
    icon: FaXTwitter,
    description: "Follow us on X (Twitter)",
  },
  reddit: {
    name: "Reddit Community",
    href: "https://www.reddit.com/r/locora/",
    icon: FaReddit,
    description: "Join our community on Reddit",
  },
  Discord: {
    name: "Discord Community",
    href: "https://discord.gg/ksxrdnETuc",
    icon: FaDiscord,
    description: "Join our Discord server",
  },
  github: {
    name: "GitHub Repository",
    href: "https://github.com/alxndlk/locora-website",
    icon: FaGithub,
    description: "Check out our GitHub repos",
  },
} satisfies Record<string, LinkItem>;

export const ADMINISTRATION_LINKS = {
  telegram: {
    name: "Developer Telegram",
    href: "https://t.me/alxndlk",
    description: "Contact us on Telegram",
    label: "Administration",
  },
  email: {
    name: "Developer Email",
    href: "mailto:livik059@gmail.com",
    description: "Contact us via Email",
    label: "Administration",
  },
} satisfies Record<string, LinkItem>;

export const APPLICATION_SUPPORT_EMAIL = {
  support_email: {
    name: "Application Support Email",
    href: "mailto:support@locora.app",
    description: "Get support via Email",
    label: "Administration",
  },
} satisfies Record<string, LinkItem>;

export const SOCIALS = [
  { name: "Explore Socials", values: socialLinks },
  { name: "Administration Links", values: ADMINISTRATION_LINKS },
  { name: "Application Support Email", values: APPLICATION_SUPPORT_EMAIL },
] satisfies Section[];

export const NAVIGATION_LINKS_HEADER = {
  home: { name: "Overview", route: "/" },
  socials: { name: "Socials", values: SOCIALS },
  download: { name: "Download", route: links.download.route },
} satisfies NavigationHeaderLinks;
