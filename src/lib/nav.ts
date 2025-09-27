import { FaXTwitter, FaGithub, FaReddit, FaDiscord } from "react-icons/fa6";
import { NavLink } from "../../types";

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
    name: "Twitter",
    href: "https://x.com/locora_app",
    icon: FaXTwitter,
    description: "Follow us on X (Twitter)",
  },
  reddit: {
    name: "Reddit",
    href: "https://www.reddit.com/r/locora/",
    icon: FaReddit,
    description: "Join our community on Reddit",
  },
  Discord: {
    name: "Discord",
    href: "https://discord.gg/ksxrdnETuc",
    icon: FaDiscord,
    description: "Join our Discord server",
  },
  github: {
    name: "GitHub",
    href: "https://github.com/alxndlk/locora-website",
    icon: FaGithub,
    description: "Check out our GitHub repos",
  },
} as const;

export const navItems: Record<string, { title: string; values: NavLink[] }> = {
  community: {
    title: "Community",
    values: Object.values(socialLinks),
  },
  download: {
    title: links.download.name,
    values: [links.download],
  },
};
