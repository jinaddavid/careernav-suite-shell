import * as react from 'react';
import { ComponentType, ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

type SuiteProductId = "studio" | "jobs" | "lab" | "live" | "gym" | "my-paths";
type SuiteProductUrls = {
    studio: string;
    gym: string;
    lab: string;
    live: string;
};
type SuiteUser = {
    name?: string | null;
    email?: string | null;
    avatarUrl?: string | null;
};
type SuiteNavItem = {
    to: string;
    label: string;
};
type SuiteLinkProps = {
    to: string;
    className?: string;
    children?: ReactNode;
    onClick?: () => void;
    "aria-label"?: string;
};
type SuiteNavLinkProps = {
    to: string;
    end?: boolean;
    className?: string | ((state: {
        isActive: boolean;
    }) => string);
    children?: ReactNode;
    onClick?: () => void;
};
type SuiteLinkComponent = ComponentType<SuiteLinkProps>;
type SuiteNavLinkComponent = ComponentType<SuiteNavLinkProps>;
type SuiteHeaderProps = {
    productId: SuiteProductId;
    /** Display name in Suite / Name (defaults from product catalog) */
    productName?: string;
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

declare function SuiteHeader({ productId, productName, navItems, user, isAuthenticated, onLogout, onLoginClick, onSearchClick, searchPlaceholder, Link: LinkComp, NavLink: NavLinkComp, productUrls, getSsoToken, accountSettingsHref, accountLabel, loginHref, homeHref, showThemeToggle, theme, onThemeToggle, className, }: SuiteHeaderProps): react.JSX.Element;

type Props$1 = {
    productId: SuiteProductId;
    productUrls: SuiteProductUrls;
    getSsoToken?: () => string | null | undefined;
    onNavigate?: () => void;
    onLogout?: () => void;
    accountSettingsHref?: string;
    accountLabel?: string;
};
declare function AppSwitcher({ productId, productUrls, getSsoToken, onNavigate, onLogout, accountSettingsHref, accountLabel, }: Props$1): react.JSX.Element;

type Props = {
    theme?: "light" | "dark";
    onToggle?: () => void;
};
declare function ThemeToggle({ theme, onToggle }: Props): react.JSX.Element | null;

type SuiteProductDef = {
    id: SuiteProductId;
    name: string;
    Icon: LucideIcon;
    iconColor: string;
    hoverBg: string;
    ringColor: string;
    activeBg: string;
    /** Studio-hosted path products (jobs, my-paths) */
    studioPath?: string;
};
declare const SUITE_PRODUCTS: SuiteProductDef[];
declare function productDisplayName(id: SuiteProductId): string;
/** Resolve absolute href for a suite product tile. */
declare function resolveProductHref(product: SuiteProductDef, urls: SuiteProductUrls, token?: string | null): string;

declare const AUTH_STORAGE_KEY = "careernav_auth";
/** Read JWT from careernav_auth localStorage blob. */
declare function getCareernavAuthToken(): string | null;
/**
 * Append ?sso=token when navigating to a different origin.
 * Same-origin URLs are returned unchanged.
 */
declare function withSso(href: string, token?: string | null): string;

export { AUTH_STORAGE_KEY, AppSwitcher, SUITE_PRODUCTS, SuiteHeader, type SuiteHeaderProps, type SuiteLinkComponent, type SuiteLinkProps, type SuiteNavItem, type SuiteNavLinkComponent, type SuiteNavLinkProps, type SuiteProductDef, type SuiteProductId, type SuiteProductUrls, type SuiteUser, ThemeToggle, getCareernavAuthToken, productDisplayName, resolveProductHref, withSso };
