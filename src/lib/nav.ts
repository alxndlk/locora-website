import {
  FaXTwitter,
  FaLinkedin,
  FaYoutube,
  FaSlack,
  FaGithub,
} from "react-icons/fa6";
import { NavLink } from "../../types";

export const links = {
  home: { name: "Home", route: "/", description: "Go to the homepage" },
  login: {
    name: "Sign In",
    route: "/login",
    description: "Log in to your account",
  },
  signup: {
    name: "Sign Up",
    route: "/signup",
    description: "Create a new account",
  },
  download: {
    name: "Download",
    route: "/download",
    description: "Download our app",
  },
  pricing: {
    name: "Pricing",
    route: "/pricing",
    description: "See our pricing plans",
  },
  changelog: {
    name: "Changelog",
    route: "/changelog",
    description: "View latest updates",
  },
  docs: {
    name: "Documentation",
    route: "/docs",
    description: "Read the documentation",
  },
  blog: {
    name: "Blog",
    route: "/blog",
    description: "Read our latest articles",
  },
};

export const socialLinks = {
  x: {
    name: "Twitter",
    href: "https://x.com",
    icon: FaXTwitter,
    description: "Follow us on X (Twitter)",
  },
  linkedin: {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: FaLinkedin,
    description: "Connect with us on LinkedIn",
  },
  youtube: {
    name: "YouTube",
    href: "https://youtube.com",
    icon: FaYoutube,
    description: "Watch our videos on YouTube",
  },
  slack: {
    name: "Slack",
    href: "https://slack.com",
    icon: FaSlack,
    description: "Join our Slack community",
  },
  github: {
    name: "GitHub",
    href: "https://github.com",
    icon: FaGithub,
    description: "Check out our GitHub repos",
  },
} as const;

export const navItems: Record<string, { title: string; values: NavLink[] }> = {
  pricing: {
    title: links.pricing.name,
    values: [links.pricing],
  },
  resources: {
    title: "Resources",
    values: [links.changelog, links.docs, links.blog],
  },
  community: {
    title: "Community",
    values: Object.values(socialLinks),
  },
  download: {
    title: links.download.name,
    values: [links.download],
  },
};
