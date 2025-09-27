import { User } from "@supabase/supabase-js";
import { ReactNode } from "react";
import type { IconType } from "react-icons";
import { links, socialLinks } from "../nav";
import { NAVIGATION_LINKS_HEADER } from "@/constants";

export type AlertProps = {
  message: React.ReactNode;
  type: "success" | "error" | "info";
  className?: string;
  onClose?: () => void;
};

export type SpinnerProps = {
  size?: 24 | 50 | 100 | 48 | 32 | 64 | number;
  color?: string;
};

export type WrapperProps = {
  children: ReactNode;
  footerLarge?: boolean;
  blackHeader?: boolean;
  needHeader?: boolean;
};

export type MobileHeaderProps = {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  userName?: string | null;
  avatarURL?: string | null;
};

export type AppRouteLink = {
  name: string;
  route: string;
  label?: string;
  description?: string;
};

export type ExternalNavLink = {
  name: string;
  href: string;
  icon?: IconType;
  description?: string;
};

export type NavLink = AppRouteLink | ExternalNavLink;
export type LinksMap = typeof links;
export type SocialLinksMap = typeof socialLinks;

export type HeaderViewProps = {
  blackHeader?: boolean;

  isMobileHeader: boolean;
  openMobile: () => void;
  closeMobile: () => void;

  user: User | null;
  userName: string;
  avatarURL: string;

  links: LinksMap;

  onGo: (href: string) => void;
  onSignOut: () => Promise<void> | void;
  headerText?: string;
};

export type HoverMenuProps = {
  open: string | null;
  setOpen: React.Dispatch<React.SetStateAction<string | null>>;
  menuData: SocialLinksMap;
};

export type Item = { label: string; href: string; external?: boolean };
export type Section = { title: string; items: Item[] };
export type NavigationHeaderLinks = typeof NAVIGATION_LINKS_HEADER;

export type NavProps = {
  hovered: string | null;
  onHoverChange: (key: string | null) => void;
  setMenuData: React.Dispatch<React.SetStateAction<SocialLinksMap>>;
};
