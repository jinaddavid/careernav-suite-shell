import type { ComponentType, ReactNode } from "react";

export type SuiteProductId =
  | "studio"
  | "jobs"
  | "lab"
  | "live"
  | "gym"
  | "my-paths";

export type SuiteProductUrls = {
  studio: string;
  gym: string;
  lab: string;
  live: string;
};

export type SuiteUser = {
  name?: string | null;
  email?: string | null;
  avatarUrl?: string | null;
};

export type SuiteNavItem = {
  to: string;
  label: string;
  /** When true, only exact path matches (default: prefix match for nested routes) */
  end?: boolean;
};

export type SuiteLinkProps = {
  to: string;
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
  "aria-label"?: string;
};

export type SuiteNavLinkProps = {
  to: string;
  end?: boolean;
  className?: string | ((state: { isActive: boolean }) => string);
  children?: ReactNode;
  onClick?: () => void;
};

export type SuiteLinkComponent = ComponentType<SuiteLinkProps>;
export type SuiteNavLinkComponent = ComponentType<SuiteNavLinkProps>;

export type SuiteHeaderProps = {
  productId: SuiteProductId;
  /** Display name in Suite / Name (defaults from product catalog) */
  productName?: string;
  /** Letter in the brand mark (defaults to first letter of product name) */
  productInitial?: string;
  navItems?: SuiteNavItem[];
  user?: SuiteUser | null;
  isAuthenticated?: boolean;
  onLogout?: () => void;
  onLoginClick?: () => void;
  /** When set, shows search control + ⌘K shortcut */
  onSearchClick?: () => void;
  searchPlaceholder?: string;
  /** In-app SPA link (react-router Link or TanStack adapter) */
  Link?: SuiteLinkComponent;
  /** Active-aware nav link; falls back to Link */
  NavLink?: SuiteNavLinkComponent;
  productUrls: SuiteProductUrls;
  /** Return JWT for ?sso= when navigating cross-origin */
  getSsoToken?: () => string | null | undefined;
  accountSettingsHref?: string;
  accountLabel?: string;
  loginHref?: string;
  homeHref?: string;
  showThemeToggle?: boolean;
  /** Dark mode controlled externally; called when user toggles */
  theme?: "light" | "dark";
  onThemeToggle?: () => void;
  className?: string;
};
