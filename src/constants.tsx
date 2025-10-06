import { FiAlertCircle, FiCheckCircle, FiInfo } from "react-icons/fi";
import { links, socialLinks } from "./lib/nav";
import {
  Card,
  FaqItem,
  ScrollTextProps,
  SectionItem,
  Tile,
} from "./lib/types/types";
import { LuCalendarCheck2 } from "react-icons/lu";
import { FaPeopleRobbery, FaPlaceOfWorship } from "react-icons/fa6";
import { TbArrowGuide, TbBuildingAirport } from "react-icons/tb";
import { IoShareOutline } from "react-icons/io5";
import { IoIosApps } from "react-icons/io";
import { config } from "./config";

export const download_app_src: string = "/icons/download.png";

/**
 * Icons used throughout the app
 * Each icon includes aria-hidden for accessibility
 */

export const ICONS = {
  success: <FiCheckCircle aria-hidden />,
  error: <FiAlertCircle aria-hidden />,
  info: <FiInfo aria-hidden />,
  Planning: () => <LuCalendarCheck2 size={64} />,
  Places: () => <FaPlaceOfWorship size={64} />,
  Guides: () => <TbArrowGuide size={64} />,
  Culture: () => <FaPeopleRobbery size={64} />,
  Sharing: () => <IoShareOutline size={64} />,
  Airports: () => <TbBuildingAirport size={64} />,
  LocalApps: () => <IoIosApps size={64} />,
  download: "/icons/download.png",
  home_screen: "/images/home_screen.png",
} as const;

/**
 * Footer text items with links to terms and privacy
 * Each item is a string, with terms and privacy dynamically inserted
 */

export const footerText = [
  `${config.locora.baseName} is free to use. No subscription fees.`,
  "A compatible device, the latest app version, and an internet connection may be required.",
  "Passwordless sign-in only. Use email login only if you’ve previously authenticated via a provider (e.g., Apple, Google, GitHub).",
  "Features and content may vary by region and are subject to change.",
  "Third-party services and integrations may require their own accounts and are subject to their terms.",
  "Network usage may incur data charges from your mobile or internet provider.",
  "Some features may require the latest OS updates and/or a stable internet connection.",
  `By using Locora you agree to the ${links.terms.name} and ${links.privacy.name}.`,
];

/**
 * Footer sections with titles and links
 * Each section includes a title and an array of items with labels and hrefs
 * Links to external sites include an external flag for proper handling
 */

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

/**
 * FAQ items with questions and answers
 * Each item includes a question and a detailed answer
 * Answers may include links to relevant sections or external resources
 */

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
    q: "How does TestFlight work?",
    a: "TestFlight lets you try pre-release builds before they hit the App Store. Features in beta may change, be removed, or occasionally break; this helps us test performance and reliability across devices. Your feedback directly shapes what ships publicly, so early testers often see fixes and improvements land fastest.",
  },
  {
    q: "What data does Locora use?",
    a: "With your permission, Locora may use precise and background location to detect arrivals and compute city/country/day counts. Location is processed with power efficiency in mind and can be disabled at any time in iOS Settings → Privacy & Security → Location Services. If you turn location off, the app still works, but automatic welcomes and some stats won’t be available.",
  },
  {
    q: "Can I edit public pages?",
    a: "A Creator Plan is planned to allow edits to curated public pages (e.g., adding verified tips or improving city info). All payments for this plan, if/when launched, will be processed exclusively via the App Store, and attribution to your username may appear on public edits and histories. We reserve the right to review and revert changes for quality, safety, and accuracy.",
  },
];

/**
 * Icons for the accessibility showcase features
 * Each icon is imported from react-icons and used in the feature list
 */

export const ScrollText: ScrollTextProps[] = [
  { title: "Explore the world", subtitle: "smart, curated city guides." },
  { title: "Plan in minutes", subtitle: "prices, SIM/eSIM, transport info." },
  { title: "Find great spots", subtitle: "food, sights, and hidden gems." },
  { title: "Travel like a local", subtitle: "culture tips and key phrases." },
  { title: "Share your trip", subtitle: "collaborative lists and plans." },
];

/**
 * Tiles for the magazine grid in the towns showcase
 * Each tile includes an image path and optional alt text
 */

export const Tiles: Tile[] = [
  { img: "/cities_view/1.jpg" },
  { img: "/cities_view/2.jpg" },
  { img: "/cities_view/3.jpg" },
  { img: "/cities_view/4.jpg" },
  { img: "/cities_view/5.jpg" },
  { img: "/cities_view/6.jpg" },
  { img: "/cities_view/5.jpg" },
  { img: "/cities_view/7.jpg" },
  { img: "/cities_view/8.jpg" },
];

/**
 * Cards for the feature showcase section
 * Each card includes a kicker, headline, body, and optional title and cta
 */

export const cards: Card[] = [
  {
    kicker: "App Store Available",
    headline: "Use for Free",
    cta: { label: "Try for free*", href: "#download" },
    body: "Start your travel log and city welcomes for free. Extras will come via App Store purchases.",
  },
  {
    kicker: "Early access",
    headline: "TestFlight",
    title: "",
    body: "Try pre-release builds first. Features may change; your feedback helps.",
  },
  {
    kicker: "Coming soon",
    headline: "Creator Plan",
    title: "",
    body: "Edit public city pages and add tips. Managed via App Store; cancel anytime in Apple ID.",
  },
];

/**
 * Text for the accessibility showcase section
 * Includes a title and an array of features with ids, labels, and icons
 */

export const AccessibilityShowcaseText = {
  title: "Read, listen, and play Apple News on your favorite devices.",
};

/**
 * Features for the accessibility showcase section
 * Each feature includes an id, label, and icon component
 */

export const AccessibilityShowcaseFeatures = [
  {
    id: "Planning",
    label: "Planning",
    Icon: ICONS.Planning,
  },
  {
    id: "Guides",
    label: "Guides",
    Icon: ICONS.Guides,
  },
  {
    id: "Places",
    label: "Places",
    Icon: ICONS.Places,
  },
  {
    id: "Culture",
    label: "Culture",
    Icon: ICONS.Culture,
  },
  {
    id: "Airports",
    label: "Airports",
    Icon: ICONS.Airports,
  },
  {
    id: "Local Apps",
    label: "Local Apps",
    Icon: ICONS.LocalApps,
  },
];

export const TownsShowcaseText = {
  title: "Explore any city easily with Locora.",
  subtitle:
    "Explore a curated world of cities in one place. From iconic skylines to hidden streets, Locora highlights the must-see spots, local flavors, and moments that define each destination. Dive into vivid visuals, quick tips, and smart picks — then save places to plan your perfect day, online or offline.",
};
